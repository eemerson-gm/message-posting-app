const express = require('express');
const routes = express.Router();
const dbo = require('./connect');
const ObjectId = require("mongodb").ObjectId;

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

module.exports = routes;