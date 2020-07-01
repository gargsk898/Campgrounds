var express     = require("express"),
    router      = express.Router(),
Campground      = require("../models/Campground"),
middleWareObj   = require("../middlewares");


//INDEX-show all campgrounds
router.get("/",function (req,res){
    Campground.find({},function(err,camps){
        if(err){
            console.log("error in getting db from database");
        }
        else
        {
          res.render("campgrounds/index",{cg:camps});   
        }
    });
});


//CREATE -add new Campground to DB
router.post("/",middleWareObj.isLoggedIn,function(req,res){
    var name    =req.body.name;
    var img     = req.body.img;
    var desc    =req.body.desc;
    var author  ={id:req.user._id,username:req.user.username};
    
    var newCampground ={name:name,image:img,description:desc,author};
  
    Campground.create(newCampground,function(err,camp){
        if(err)
            console.log(err);
        else{
            console.log(camp);
            res.redirect("/index");
             }
    });
    
});

//NEW-form to create new campground
router.get("/new",middleWareObj.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});


//SHOW-show info about campground
router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campDetails){
        if(err)
            console.log(err);
        else
            res.render("campgrounds/show",{campground:campDetails});
    });
});


//Edit campground
router.get("/:id/edit",middleWareObj.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundcamp){
        if(err)
            console.log(err);
        else
            res.render("campgrounds/edit",{camp:foundcamp});});
});

//Update the camp
router.put("/:id",middleWareObj.checkCampgroundOwnership,function(req, res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,foundcamp){
       if(err)
       console.log(err);
       else
       res.redirect("/index/"+req.params.id);
    });
});

router.delete("/:id",middleWareObj.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deletecamp){
        if(err)
        console.log(err);
        else{
            res.redirect("/index");
        }
    });
});






module.exports  = router;