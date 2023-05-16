const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authRoutes = require("./auth.routes");
const isLoggedOut = require("../middlewares/isLoggedOut");
const User = require("../models/User.model");
const Habit = require("../models/Habit.model");
// const helpers = require('../utils/helpers.js');


/* GET home page */
router.get("/", (req, res, next) => {
  // const currentTime = getCurrentTime();
  // console.log(currentTime)
  if(req.session.user){
    res.render("index",{user: req.session.user});
  }else{
    res.render("index");
  }
});

router.use("/auth", authRoutes);

router.get("/messages", isLoggedIn, (req, res) => {
  res.send("Your recent messages" + req.session.user.username);
});

router.get("/profile", isLoggedIn, async(req, res) => {
  
  const user = await User.findOne({ username: req.session.user.username }).populate('habit');


    console.log("hello this is the user data", user)
    console.log("User Habits ======>", user.habit)
  res.render("profile", { userName: req.session.user.username,   userImage: user.userImage, habits: user.habit});
  
});

router.get("/profile/settings", isLoggedIn, async(req,res) => {
  try{
    console.log("this is the route that renders profile/settings. Edit it in order to update user!")
  res.render("settings");
  }catch(err){
    console.error("There was an error", err);
  }
})
/*
router.post("/profile/settings", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).render("error", { message: "User not found" });
    }
    user.username = username;
    await user.save();
    console.log(user);
    res.render("namesuccess");
  } catch (err) {
    console.error("There was an error", err);
    res.render("error");
  }
});

router.post("/profile/settings", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { username: username } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).render("error", { message: "User not found" });
    }

    console.log(updatedUser);
    res.render("namesuccess");
  } catch (err) {
    console.error("There was an error", err);
    res.render("error");
  }
});

*/
router.get("/habits", (req, res, next) => {
  res.render("habits");
});


module.exports = router;
