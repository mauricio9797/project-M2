const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authRoutes = require("./auth.routes");
const isLoggedOut = require("../middlewares/isLoggedOut");
const User = require("../models/User.model");
const Habit = require("../models/Habit.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/auth", authRoutes);

router.get("/messages", isLoggedIn, (req, res) => {
  res.send("Your recent messages" + req.session.user.username);
});

router.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.session);
  console.log(req.session.user);
  res.render("profile", { userName: req.session.user.username });
});

router.get("/habits", (req, res, next) => {
  res.render("habits");
});


module.exports = router;
