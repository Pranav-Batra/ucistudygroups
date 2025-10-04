require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const offerings = require('./routes/courseOfferings')
const auth = require('./routes/auth')
const studyGroups = require('./routes/studygroups')
const profiles = require('./routes/profiles')
const express = require('express')

/*
FRIDAY TODOS
TODO: route to get all study groups and render them on front page
TODO: allow users to join study group
TODO: route to view study group & members in detail
TODO: view user profiles and edit your own profile
TODO: allow users to leave a study group
TODO: style everything decently

SATURDAY TODOS
TODO: schedule meeting within group and send out email invite when meeting is scheduled(add meetings table to db)
TODO: deploy and promo first release

*/
const app = express();
const port = process.env.PORT || 3000

const cors = require('cors')
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.use(express.json())


app.use(session({
    secret: process.env.SESSION_SECRET || "temp",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/offerings', offerings)
app.use('/auth', auth)
app.use('/studygroups', studyGroups)
app.use('/profiles', profiles)

app.listen(port, () => {console.log(`Listening on port ${port}`)})