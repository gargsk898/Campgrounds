var Campground = require("../models/Campground"),
    Comment    = require("../models/Comment")


var middleWareObj = {};

middleWareObj.isLoggedIn=function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    else{
        req.flash("error","Please Login first !");
        res.redirect("/login");
    }
}

middleWareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundcamp){
            if(err){
                req.flash("error","Campground not found !");
                res.redirect("back");
            }
                
            else{
                if(foundcamp.author.id.equals(req.user._id))
                   next();
                else{
                    req.flash("error","You don't have permission");
                    res.redirect("back");
                }
                
            }
                
        });
    }
    else{
        req.flash("error","You don't have permission");
        res.redirect("back");
    }
        
}; 


middleWareObj.checkCommentOwnership = function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id,function(err, foundComment) {
           if(err)
           res.redirect("back");
           else{
               
               if(foundComment.author.id.equals(req.user._id))
               next();
                
               else{
                req.flash("error","You don't have permission");
                res.redirect("back");
                }
           }
           
       });
    }
}





module.exports=middleWareObj;