
// Server
require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')
const cors = require('cors')
const port = process.env.PORT || 5000
const dbo = require('./src/connect')

// App
const app = express()
app.use(cors())
app.use(express.json())
app.use(require('./src/routes'))
app.use(cookieParser())

// Start server
app.listen(port, () => {
    dbo.connectToDatabase(function(err){
        if (err) console.error(err)
    })
    console.log(`Server is running on port: ${port}`)
})

app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized:true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false
}))