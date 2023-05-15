const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Habit = require("../models/Habit.model");
const bcryptjs = require("bcryptjs");
//const session = require("express-session")
const isLoggedOut = require("../middlewares/isLoggedOut");
const isLoggedIn = require("../middlewares/isLoggedIn");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const uploader = require('../middlewares/cloudinary.config.js');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require("../db");

router.get("/aboutUs", (req, res, next) => {
  res.render("auth/aboutUs");
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/");
  });
});

router.get("/", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", uploader.single("userImage"),  async (req, res, next) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  const existingUser = await User.findOne({ username: req.body.username });
 
  if (existingEmail || existingUser) {
    return res.render("accexist", { error: "Email/User already exists" });
  }

 const salt = await bcryptjs.genSalt(12);
 const hash = await bcryptjs.hash(req.body.password, salt);
 const user = new User({ username: req.body.username, email:req.body.email, userImage: req.file.path, password: hash });

 await user.save();
req.session.user = {
username: user.username,
userId: user._id,
email:  user.email,
}


res.redirect('/profile');

 
})


router.get('/login',isLoggedOut, (req,res)=>{
  res.render("auth/login")
})

router.post('/login',async(req,res,next) =>{
  try {
    const user = await User.findOne({email: req.body.email})
    console.log(req.body)
  
    if (!user){
      return res.render("auth/login", {error: "user non-exist"})
    }next()
    
    const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!passwordMatch){
      return res.render( 'auth/login', {error:"Password is incorrect"});
    }
    req.session.user = {
      username: user.email,
      userId: user._id
  }

    console.log(req.body);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

router.get("/habitCreate", isLoggedIn, (req, res, next) => {
  res.render("habitCreate");
});


router.post("/habitCreate", isLoggedIn, async (req, res, next) => {
  console.log("hola ======>",req.body)
  try {
    const habit = new Habit({
      Habit: req.body.Habit,
      Tasks: req.body.Tasks,
      Tasks1: req.body.Tasks1,
      Tasks2: req.body.Tasks2,
      Time: req.body.Time,
      Count: req.body.Count,
      Duration: req.body.Duration,
      Goal: req.body.Goal,
    });
    await habit.save();
    const user = await User.updateOne(
      { _id: req.session.user.userId },
      { $push: { habit: habit._id } }
    );


    res.redirect("/myHabits");
  } catch (err) {
    res.status(404).render("emptyfield");
  }
});
router.post("/habits/earthing", isLoggedIn, async (req, res, next) => {
  console.log("hola desde auth.routes======>",req.body)
  try {
    const habit = new Habit({
      Habit: req.body.Habit,
      Tasks: req.body.Tasks,
      Tasks1: req.body.Tasks1,
      Tasks2: req.body.Tasks2,
      Time: req.body.Time,
      Count: req.body.Count,
      Duration: req.body.Duration,
      Goal: req.body.Goal,
    });
    await habit.save();
    const user = await User.updateOne(
      { _id: req.session.user.userId },
      { $push: { habit: habit._id } }
    );


    res.redirect("/myHabits");
  } catch (err) {
    res.status(404).render("emptyfield");
  }
});


router.get("/habitEdit/:habitId", isLoggedIn, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.findById(habitId);
    
  } catch (err) {
    console.error("There was an error", err);
  }
});

router.post("/habitEdit/:habitId", isLoggedIn, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const updateData = {
      Habit: req.body.habit,
      Tasks: req.body.tasks,
      Tasks1: req.body.tasks1,
      Tasks2: req.body.tasks2,
      Time: req.body.time,
      Count: req.body.count,
      Duration: req.body.duration,
      Goal: req.body.goal,
    };
    const habitUpdated = await Habit.findByIdAndUpdate(habitId, updateData, {
      new: true,
    });
    res.redirect(`/myHabits/${habitId}`);
  } catch (err) {
    console.error("There was an error", err);
  }
});

router.post("/habitDelete/:habitId", isLoggedIn, async (req, res) => {
  try {
    const { habitId } = req.params;
    const habitDeleted = await Habit.findByIdAndDelete(habitId);
    res.redirect("/myHabits?habitDeleted=true");
  } catch (err) {
    console.error("There was an error", err);
  }
});
router.get("/userSettings", isLoggedIn, async (req, res, next) => {
  console.log("this is --------->", req.session.user.userId)
  const userToDelete = await User.findOne({username: req.session.user.username, userId:req.session.user.userId})
  res.render("userSettings", {username: req.session.user.username, userId:req.session.user.userId});
});
router.post("/accountDelete/:userId", isLoggedIn,  async (req, res) => {
  try {
    const { userId } = req.params;
    const userDeleted = await User.findByIdAndDelete(userId);
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
    res.redirect("/")
    });  
  } catch (err) {
    console.error("There was an error", err);
  }
});
router.get("/accountEdit/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.render("accountEdit", { user });
  } catch (err) {
    console.error("There was an error", err);
  }
});
/*router.post("/accountEdit/:userId", isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findByIdandUpdate(userId, {username: req.session.user.username }, {new: true})
    console.log("hello this is the updatedUser data", user)
  res.render("updateProfile", { userName: req.session.user.username});
  
});*/
/*router.post("/accountEdit/:userId", isLoggedIn, async (req, res) => {
  try {
    const userId = req.params.userId;
   
    const updateData = {
      username: req.session.username,
      email: req.session.email,
      
    };

    const userUpdated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
console.log("updated data ------>", req.user)
    res.redirect("/updateProfile");
  } catch (err) {
    console.error("There was an error", err);
  }
});*/
router.get("/updateProfile", isLoggedIn, async(req, res) => {
res.render("updateProfile")
});



router.get("/myHabits", isLoggedIn, async (req, res) => {
  try {
    const userHabits = await User.findById(req.session.user.userId).populate(
      "habit"
    );
    const user = await User.findById((req.session.user.userId))
    console.log("UserHabits ======>", userHabits);
    res.render("myHabits", { userHabits, user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/myHabits/:id", isLoggedIn, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    res.render("habitDetail", { habit });
  } catch (err) {
    console.log(err);
  }
});
router.get("/habitPractice", (req, res) => {
  // Render the "habitPractice" page
  res.render("habitPractice");
});

router.get('/about', (req, res, next) => {
  res.render("auth/aboutUs");
});

router.get('/contact', (req, res) => {
  res.render('auth/contact');
});

router.get('/privacy-policy', (req, res) => {
  res.render('auth/prpolicy');
});

router.get('/terms-of-use', (req, res) => {
  res.render('auth/termsUse');
});

router.get('/habits/auth/login', (req, res) => {
  res.render('auth/login');
});

router.get('/importance', (req, res) => {
  res.render('auth/importance');
});

router.get('/importance', (req, res) => {
  const videoUrl = 'https://www.youtube.com/embed/vN1aRN5bQQ0?start=33';
  res.render('auth/importance', { videoUrl });
});


router.get("/habitCount/:habitId", isLoggedIn, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.findById(habitId);
    res.render("habitCount", { habit });
  } catch (err) {
    console.error("There was an error", err);
  }
});
router.post("/habitCount/:habitId", isLoggedIn, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const updateData = {
      Count: req.body.count,
    };
    const habitUpdated = await Habit.findByIdAndUpdate(habitId, updateData, {
      new: true,
    });
    
    res.redirect(`/myHabits/${habitId}`);
  } catch (err) {
    console.error("There was an error", err);
  }
});



/*router.post("/userSettings/:userId", isLoggedIn, async (req, res, next) => {
  try{
  const {userId} = req.params
  const userDeleted = await User.findByIdAndDelete({userId})
  res.redirect("/");
  }catch(err){
    console.log(err)
  }
  
});*/
module.exports = router;

