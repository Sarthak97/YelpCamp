var mongoose = require("mongoose"),
  Campground = require("./models/camp"),
  Comment    = require("./models/comments");
  
 
var data = [
        {
            name : "Cloud's Rest" ,
            image : "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?h=350&auto=compress&cs=tinysrgb" ,
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name : "Desert Mesa" ,
            image : "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb" ,
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name : "Canyon Floor" ,
            image : "https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?h=350&auto=compress&cs=tinysrgb" ,
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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