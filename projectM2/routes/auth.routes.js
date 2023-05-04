const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const Habit = require("../models/Habit.model")
const bcryptjs = require("bcryptjs");
//const session = require("express-session")
const isLoggedOut = require("../middlewares/isLoggedOut");
const isLoggedIn = require('../middlewares/isLoggedIn');

//require("../db");
router.post('/logout', (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      next(err);
      return;
    }
    res.redirect('/');
  })
})


router.get('/signup',isLoggedOut,(req,res)=>{
  res.render("auth/signup")
})

router.post('/signup',async(req,res)=>{
  const existingEmail = await User.findOne({ email: req.body.email });
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingEmail || existingUser) {
    return res.render("accexist", {error: "Email/User already exists"});
  }
 const salt = await bcryptjs.genSalt(12);
 const hash = await bcryptjs.hash(req.body.password, salt);
 const user = new User({ username: req.body.username, email:req.body.email, password: hash });
 await user.save();
req.session.user = {
username: user.username,
}
res.redirect('/profile');

 
})

router.get('/login',isLoggedOut, (req,res) =>{
  res.render('auth/login')
})

router.post('/login',async(req,res,next) =>{
  try {
    const user = await User.findOne({ username: req.body.username, email: req.body.email})
    console.log(req.body)
  
    if (!user){
      return res.render("auth/login", {error: "user non-exist"})
    }
    
    const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!passwordMatch){
      return res.render( 'auth/login', {error:"Password is incorrect"});
    }

    req.session.user = {
      username: user.username,
      userId: user._id
  }

  console.log(req.body);
  res.redirect('/profile');
 }catch(err){
   next(err);
  }
});

router.get("/habitCreate", isLoggedIn, (req, res) => {
  res.render("habitCreate");
});

router.post("/habitCreate", isLoggedIn, async (req, res, next) => {
  try{
    const habit = new Habit({ Habit: req.body.Habit, Tasks:req.body.Tasks, Time: req.body.Time, Duration: req.body.Duration, Goal: req.body.Goal });
    await habit.save();
    
    const user = await User.updateOne({_id: req.session.userId}, {$push:{habit: habit._id} })
    
    res.redirect("/profile")
  }catch(err){
    next(err);
  };

  
} );



router.get("/myHabits", isLoggedIn, async(req, res) => {
  try{
    
    const userHabits = await User.findById(req.params.id).populate("habit");
    res.render("myHabits", {userHabits});
  }catch(err){
    console.log(err)
  }
  
});

router.get("/myHabits/:id", isLoggedIn, async(req, res) => {
  try{
  
  const habit = await User.findById(req.params.id)
  res.render('habitDetail', habit);
  } catch(err){
    console.log(err);
  }
});

/*mauricio code
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/");
  });
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
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
    
});


router.get("/login", (req, res) => {
  res.render("auth/login")
});

router.post("/auth/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username, email: req.body.email})
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
    
    
    
     res.send("hello user");
    } catch(err){
        console.log(err)
        next(err)
      }
     
    });
    */
    
    




module.exports = router;




