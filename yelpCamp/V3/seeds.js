var mongoose = require("mongoose"),
  Campground = require("./models/camp"),
  Comment    = require("./models/comments");
  
 
var data = [
        {
            name : "Cloud's Rest" ,
            image : "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?h=350&auto=compress&cs=tinysrgb" ,
            description : "blah blah blah"
        },
        {
            name : "Desert Mesa" ,
            image : "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb" ,
            description : "blah blah blah"
        },
        {
            name : "Canyon Floor" ,
            image : "https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?h=350&auto=compress&cs=tinysrgb" ,
            description : "blah blah blah"
        }
        ];
 
 
function seedDB()
{
    Campground.remove( {} , function(err) {
        if(err)
            console.log(err);
        else
            console.log("Campgrounds removed.");
            
            data.forEach(function(seed){
                Campground.create(seed , function(err , data){
                if(err)
                    console.log(err);
                else
                    console.log("Campground created.");
                    
                    Comment.create({
                        text : "This is awesome!" ,
                        author : "Clay Jenson"
                    } , function(err , comment){
                        if(err)
                            console.log(err);
                        else
                        {
                            data.comments.push(comment);
                            data.save();
                            console.log("Created new comment");
                        }
                    });
                }); 
            });
    });
    
}



module.exports = seedDB;