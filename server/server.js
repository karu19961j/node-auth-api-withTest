require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const { authenticate } = require("./middleware/authenticate");
var { mongoose } = require("./db/mongoose");
var { User } = require("./models/user");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };