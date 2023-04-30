const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/habits", (req, res, next) => {
  res.render("habits");
});

router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs");
});
module.exports = router;
