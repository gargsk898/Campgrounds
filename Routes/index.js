var express = require("express"),
    router  = express.Router(),
passport    = require("passport"),
    User    = require("../models/user");


router.get("/",function (req,res){
    res.redirect("/index");
});
//==================================
//Authentication Routes
//==================================

router.get("/register",function(req, res) {
    res.render("register");
});

router.post("/register",function(req, res) {
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err)
       {
            req.flash("error",err.message);
            console.log(err);
       res.redirect("/register");
       }
       else
       {
           passport.authenticate("local")(req,res,function(){
              req.flash("success","Welcome "+user.username+" to Yelp Camp");
              res.redirect("/login"); 
           });
       }
    
    });
});



router.get("/login",function(req, res) {
   res.render("login"); 
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login"
}),function(req,res){
    
});


router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","you are logged out");
    res.redirect("/index");
});




module.exports  = router;