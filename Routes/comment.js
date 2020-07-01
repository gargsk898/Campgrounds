var express = require("express"),
    router  = express.Router({mergeParams:true}),
Campground  = require("../models/Campground"),
Comment     = require("../models/Comment"),
middleWareObj   = require("../middlewares");




//==================================
//Comments Routes
//==================================

router.get("/new",middleWareObj.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,camp){
        if(err)
        {
            req.flash("error","Comment not found !");
            res.redirect("back");
        }
        else
        res.render("comments/new",{camp:camp});
    });
});


router.post("/",middleWareObj.isLoggedIn,function(req,res){
   Campground.findById(req.params.id,function(err, camp) {
       if(err)
       {
        req.flash("error","Comment not posted !");
            res.redirect("back");   
       }
       else
       {
           Comment.create(req.body.newcomment,function(err,newcomment){
               if(err)
               {
                   req.flash("error","Comment not found !");
                    res.redirect("back");
               }
               else
               {    
                   newcomment.author.id = req.user._id;
                   newcomment.author.username = req.user.username;
                   newcomment.save();
                   camp.comments.push(newcomment);
                   camp.save();
                   req.flash("success","Comment successfully added");
                   res.redirect("/index/"+camp._id);
               }
           });
       }
       
   });
});

router.get("/:comment_id/edit",middleWareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err)
        res.redirect("back");
        else
        res.render("comments/edit",{camp_id:req.params.id,comment:foundComment});
        
    });
});

router.put("/:comment_id",middleWareObj.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,editComment){
        if(err)
            res.redirect("back");
        else
        res.redirect("/index/"+req.params.id);
   }) ;
});

router.delete("/:comment_id/delete",middleWareObj.checkCommentOwnership,function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        res.redirect("back");
        else{
            req.flash("success","Comment successfully deleted");
            res.redirect("/index/"+req.params.id);
            
        }
        
    });
});


module.exports  = router;