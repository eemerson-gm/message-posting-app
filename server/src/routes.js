
const express = require('express')
const routes = express.Router()
const dbo = require('./connect')
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')

// Encryption
const bcrypt = require('bcrypt')
const saltRounds = 10

// Messages
routes.route("/api/messages/list").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    db_connect.collection("messages").find({}).skip(req.body.offset).limit(req.body.limit).sort({_id:-1}).toArray(function (err, result) {
        if (err) throw err
        res.json(result)
    })
})
routes.route("/api/messages/add").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    try{
        let token = req.body.token
        const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY)
        let message = {
            username: decoded.username,
            text: req.body.text,
            date: req.body.date,
            likes: 0
        }
        db_connect.collection("messages").insertOne(message, function (err, response) {
            if (err) throw err
            res.json(response)
        })
    } catch(err) {
        res.status(401).send(false)
    }
})

//Accounts
routes.route("/api/accounts/signup").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    let account = {
        username: req.body.username,
        password: req.body.password
    }
    db_connect.collection("accounts").findOne({ username: account.username }, function (err, dbaccount) {
        if(dbaccount === null)
        {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(account.password, salt, function(err, hash) {
                    account.password = hash;
                    db_connect.collection("accounts").insertOne(account, function (err, response) {
                        if (err) throw err
                        res.json(response)
                    })
                })
            })
        }
        else
        {
            res.status(409).send(false)
        }
    })
})
routes.route("/api/accounts/login").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    let account = {
        username: req.body.username,
        password: req.body.password
    }
    db_connect.collection("accounts").findOne({ username: account.username }, function (err, dbaccount) {
        if(dbaccount !== null)
        {
            bcrypt.compare(account.password, dbaccount.password, function(err, result) {
                if(result){
                    const token = jwt.sign({
                        username: dbaccount.username
                    },process.env.WEBTOKEN_KEY,{
                        expiresIn: "2h"
                    })
                    console.log({token: token})
                    res.json({token: token})
                }
                else
                {
                    res.json(false)
                }
            })
        }
    })
})
routes.route("/api/accounts/token").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    try{
        let token = req.body.token
        const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY)
        res.status(200).send(decoded)
    } catch(err) {
        res.status(401).send(false)
    }
})

module.exports = routes