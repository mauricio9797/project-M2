const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authRoutes = require('./auth.routes');
const isLoggedOut = require('../middlewares/isLoggedOut');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/auth', authRoutes)

router.get('/messages',isLoggedIn, (req,res)=>{
  
  res.send("Your recent messages" + req.session.user.username)
})

router.get("/profile",isLoggedIn,(req,res) =>{
  
  console.log(req.session);
  console.log(req.session.user)
  res.render("profile",{userName :req.session.user.username})
})

router.get("/habits", (req, res, next) => {
  res.render("habits");
});

router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs");
});



/*
router.get("/messages", isLoggedIn, (req, res) => {
  res.send("Messages" + req.session.user.email);
});

router.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.session);
  console.log(req.session.user);

  res.render("profile", { userEmail: req.session.user.email });
});

router.get("/habits", isLoggedIn, (req, res, next) => {
  res.render("habits");
});

router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs");
});
*/

module.exports = router;
