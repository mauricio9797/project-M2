const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const bcryptjs = require("bcryptjs");
const session = require("express-session")

require("../db");

router.get("/signup", (req, res) => {
    res.render("auth/signup")
});

router.post("/auth/signup", async (req,res) =>{
    try {
       console.log(req.body)
       
    
       const salt = await bcryptjs.genSalt(12);
   const hash = await bcryptjs.hash(req.body.password, salt);
   const user = new User({ username: req.body.username, email:req.body.email, password: hash });
   await user.save()
        

       
        res.send("succesfully signed up")
    }catch(err){
        console.log(err);
    }
    
})

router.get("/login", (req, res) => { NEW CHANGES IN Router.GET
    res.render("auth/login")
    try {
        const user = await User.findOne({ username: req.body.username})
        if (!user){
          return res.render("auth/login", {error: "user non-exist"})
        } 
           const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
      if (!passwordMatch){
        return res.render("auth/login", {error: "password is incorrect"
      });
      }
      
       req.session.user = {
        username: user.username
       }
      
      
      
       res.redirect("/profile")




});






module.exports = router;




