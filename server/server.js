
// Server
require('dotenv').config()
const path = require("path")
const express = require('express')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')
const cors = require('cors')
const port = process.env.PORT || 80
const dbo = require('./src/connect')

// App
const app = express()
app.use(cors())
app.use(express.json())
app.use(require('./src/routes'))
app.use(cookieParser())
app.use(express.static("../client/build"))

// Start server
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
})

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