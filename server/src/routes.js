
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
        let date = new Date()
        let token = req.body.token
        const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY)
        let message = {
            username: decoded.username,
            text: req.body.text,
            date: date.toLocaleString(),
            likes: []
        }
        db_connect.collection("messages").insertOne(message, function (err, response) {
            if (err) throw err
            res.json(response)
        })
    } catch(err) {
        res.status(401).send(false)
    }
})
routes.route("/api/messages/like").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    try{
        let date = new Date()
        let token = req.body.token
        const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY)
        let info = {
            username: decoded.username,
            value: req.body.value,
            id: req.body.id
        }
        switch(info.value){
            case -1:
                db_connect.collection("messages").findOneAndUpdate({
                    _id: ObjectId(info.id)
                }, {
                    $pull: {
                        likes: info.username
                    }
                })
                console.log("Removed like from: " + info.id)
                break
            default:
                db_connect.collection("messages").findOneAndUpdate({
                    _id: ObjectId(info.id)
                }, {
                    $push: {
                        likes: info.username
                    }
                })
                console.log("Added like to: " + info.id)
                break
        }
    } catch(err) {
        throw err
        res.status(401).send(false)
    }
})

//Accounts
routes.route("/api/accounts/signup").post(function (req, res) {
    let db_connect = dbo.getDatabase()
    let account = {
        username: req.body.username.toLowerCase(),
        password: req.body.password
    }
    db_connect.collection("accounts").findOne({ username: account.username }, function (err, dbaccount) {
        if(dbaccount === null)
        {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(account.password, salt, function(err, hash) {
                    account.password = hash
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
        username: req.body.username.toLowerCase(),
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
                    console.log(token)
                    res.json(token)
                }
                else
                {
                    res.json(false)
                }
            })
        }
    })
})

module.exports = routes