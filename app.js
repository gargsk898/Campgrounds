var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
LocalStrategy   = require("passport-local"),
    Campground  = require("./models/Campground"),
    Comment     = require("./models/Comment"),
methodOverride  = require("method-override"),
    flash       = require("connect-flash"),
    User        = require("./models/user");
//var    seedDB      = require("./seeds");
var commentRoutes = require("./Routes/comment"),
campgroundRoutes  = require("./Routes/campground"),
    indexRoutes   = require("./Routes/index");

//seedDB();
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
mongoose.connect("mongodb://saksham:Skg%401004@ds157707.mlab.com:57707/yelpcamp",{ useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set('useFindAndModify', false);
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"Saksham is the best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
    next();
});
app.use("/",indexRoutes);
app.use("/index",campgroundRoutes);
app.use("/index/:id/comments",commentRoutes);



//yelp_camp schema


//Campground.create({
//    name:"Campground4",
//    image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib//=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//    description:"This campground is more than what you have imagined"
//},function(err,camp){
//    if(err){
//         console.log("error in getting db from database");
//    }
//    else
//    console.log(camp);
//})




app.listen(process.env.PORT,process.env.IP ,function(){
    console.log("server has started");
});