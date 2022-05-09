const express = require('express');
const routes = express.Router();
const dbo = require('./connect');
const ObjectId = require("mongodb").ObjectId;

// Messages
routes.route("/api/messages/list").get(function (req, res) {
    let db_connect = dbo.getDatabase();
    db_connect
    .collection("messages")
    .find({})
    .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
routes.route("/api/messages/add").post(function (req, res) {
    let db_connect = dbo.getDatabase();
    let message = {
        id: req.body.id,
        text: req.body.text,
        likes: 0
    }
    db_connect
    .collection("messages")
    .insertOne(message, function (err, response) {
        if (err) throw err;
        res.json(response);
    });
});

//Accounts
routes.route("/api/accounts/add").post(function (req, res) {
    let db_connect = dbo.getDatabase();
    let account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    db_connect
    .collection("accounts")
    .insertOne(account, function (err, response) {
        if (err) throw err;
        res.json(response);
    });
});

module.exports = routes;