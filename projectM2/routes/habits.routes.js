const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const isLoggedOut = require("../middlewares/isLoggedOut");

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.get("/habits/relationships", (req, res) => {
  res.render("habits/relationships");
});

router.get("/habits/productivity", (req, res) => {
  res.render("habits/productivity");
});

router.get("/habits/mindfulness", (req, res) => {
  res.render("habits/mindfulness");
});

router.get("/habits/healthdiet", (req, res) => {
  res.render("habits/healthDiet");
});

router.get("/habits/intermittentfasting", (req, res) => {
  res.render("habits/intermittentFasting");
});

router.get("/habits/coldwater", (req, res) => {
  res.render("habits/coldWater");
});

router.get("/habits/dopaminefasting", (req, res) => {
  res.render("habits/dopamineFasting");
});

router.get("/habits/sensorydeprivation", (req, res) => {
  res.render("habits/sensoryDeprivation");
});
router.get("/habits/earthing", (req, res) => {
  res.render("habits/earthing");
});

router.get("/habits/meditation", (req, res) => {
  res.render("habits/meditation");
});

router.get("/habits/walking", (req, res) => {
  res.render("habits/walking");
});

router.get("/habits/exercise", (req, res) => {
  res.render("habits/exercise");
});

router.get("/habits/lifestyle", (req, res) => {
  res.render("habits/lifestyle");
});


module.exports = router;
