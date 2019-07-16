const express = require("express");
const jwt = require("jsonwebtoken");
const Router = express.Router();
// var config = require('./config');

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));
const { user } = require("../models/user");

// Register User
Router.post("/saveUser", async function(req, res) {
  const userDoc = user(req.body);
  try {
    const result = await userDoc.save();
    res.send(result);
  } catch (ex) {
  }
});

// Get All Users
Router.get("/getAllUsers", async function(req, res) {
  try {
    const result = await user.find();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Get All Users
Router.get("/validateUser/:id", async function(req, res) {
  try {
    const email1 = req.params.id;
    console.log(email);
    const result = await user.find({ email: email1 });
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Authenticate User
Router.post("/authenticate", async function(req, res) {
  try {
    const users = await user.find();
    const authUser = users.filter(
      user =>
        user.email === req.body.email && user.password === req.body.password
    );
    if (authUser.length !== 0) {
      var token = jwt.sign(
        {
          email: req.body.email,
          org: "tracker"
        },
        "tracker-secret-key",
        { expiresIn: "1h" }
      );
      res.send({ isLoggedIn: true,email: req.body.email, token });
    } else {
      res.status(403).send({ isLoggedIn: false, err: "Invalid details" });
    }
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = Router;
