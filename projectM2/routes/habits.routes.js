const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const isLoggedOut = require("../middlewares/isLoggedOut");

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.get("/habits/relationships", isLoggedIn, (req, res) => {
  res.render("habits/relationships");
});

router.get("/habits/productivity", isLoggedIn, (req, res) => {
  res.render("habits/productivity");
});

router.get("/habits/mindfulness", isLoggedIn, (req, res) => {
  res.render("habits/mindfulness");
});

router.get("/habits/healthdiet", isLoggedIn, (req, res) => {
  res.render("habits/healthDiet");
});

router.get("/habits/intermittentfasting", isLoggedIn, (req, res) => {
  res.render("habits/intermittentFasting");
});

router.get("/habits/coldwater", isLoggedIn, (req, res) => {
  res.render("habits/coldWater");
});

router.get("/habits/dopaminefasting", isLoggedIn, (req, res) => {
  res.render("habits/dopamineFasting");
});

router.get("/habits/sensorydeprivation", isLoggedIn, (req, res) => {
  res.render("habits/sensoryDeprivation");
});
router.get("/habits/earthing", isLoggedIn, (req, res) => {
  res.render("habits/earthing");
});

router.get("/habits/meditation", isLoggedIn, (req, res) => {
  res.render("habits/meditation");
});

router.get("/habits/walking", isLoggedIn, (req, res) => {
  res.render("habits/walking");
});

router.get("/habits/exercise", isLoggedIn, (req, res) => {
  res.render("habits/exercise");
});

router.get("/habits/lifestyle", isLoggedIn, (req, res) => {
  res.render("habits/lifestyle");
});


module.exports = router;
