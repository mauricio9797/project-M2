const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authRoutes = require("./auth.routes");
const isLoggedOut = require("../middlewares/isLoggedOut");
const User = require("../models/User.model");
const Habit = require("../models/Habit.model");

/* GET home page */
router.get("/", (req, res, next) => {
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
  console.log(req.session);
  console.log(req.session.user);
  const user = await User.findOne({username: req.session.user.username })
    console.log("hello this is the user data", user)
  res.render("profile", { userName: req.session.user.username, userImage: user.userImage});
});

router.get("/profile/settings", isLoggedIn, async(req,res) => {
  try{
  res.render("settings");
  }catch(err){
    console.error("There was an error", err);
  }
}
  )

router.get("/habits", (req, res, next) => {
  res.render("habits");
});


module.exports = router;
