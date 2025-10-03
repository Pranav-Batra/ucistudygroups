require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const offerings = require('./routes/courseOfferings')
const auth = require('./routes/auth')
const studyGroups = require('./routes/studygroups')
const express = require('express')



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

app.listen(port, () => {console.log(`Listening on port ${port}`)})