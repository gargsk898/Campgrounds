var  mongoose    = require("mongoose"),
   Campground    = require("./models/Campground.js"),
   Comment       = require("./models/Comment");
    

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

var data=[
    {
        name:"CampFire",
        image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    
    },
    {
        name:"DayLight",
        image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    
    },
     {
        name:"BeachCamp",
        image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    
    }
    ];

function seedDB()
{
    Campground.remove({},function(err)
    {
    if(err)
        {
        console.log(err);
        }
    else{
            console.log("Campgrounds removed");
            data.forEach(function(seed)
            { 
                Campground.create(seed,function (err,camp)
                {
                    if(err)
                    console.log(err);
                    else
                    {
                    console.log("added");
                    Comment.create(
                        {
                            text:"This place is awesome",
                            author:"saksham"
                        },function(err,comment)
                        {
                            if(err)
                            console.log(err);
                            else
                            {
                                camp.comments.push(comment);
                                camp.save();
                                console.log("comments added");
                            }
                            
                        }
                        );
                    }
                });
            });
        }
    });
    
}
module.exports = seedDB;
