const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require('../config/db')
const router = express.Router()

// console.log(`Client ID: ${process.env.GOOGLE_CLIENT_ID}`)
// console.log(`Client ID: ${process.env.GOOGLE_CLIENT_SECRET}`)



passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try 
    {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
        done(null, result.rows[0]);
    }
    catch (err) 
    {
        done(err, null)
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try
    {
        const email = profile.emails[0].value;
        const allowedDomain = '@uci.edu'
        
        if (!email.endsWith(allowedDomain))
        {
            return done(null, false, {message: "Invalid email domain"})
        }

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
        
        if (result.rows.length > 0)
        {
            return done(null, result.rows[0])
        }

        const newUser = await db.query(
            `INSERT INTO USERS (email, username, created_at, phone_number)
            VALUES ($1, $2, NOW(), NULL) RETURNING *`,
            [email, profile.displayName]
        )

        done(null, newUser.rows[0])
    }
    catch (error)
    {
        done(error, null)
    }
}
))

router.get('/google', 
passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', 
passport.authenticate('google', {failureRedirect: '/'}),
(req, res) => {
    // console.log(req.user)
    res.redirect('http://localhost:3001/')
})

router.get('/user', (req, res) => {
    if (req.user)
    {
        res.json({loggedIn: true, user: req.user})
    }
    else
    {
        res.json({loggedIn: false, user: null})
    }
})

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err)
        {
            return next(err)
        }
        res.redirect('http://localhost:3001/')
    })
})

module.exports = router;