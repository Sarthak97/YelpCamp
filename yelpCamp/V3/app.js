var express   = require("express"),
     app      = express(),
     body     = require("body-parser"),
     mongoose = require("mongoose"),
   Campground = require("./models/camp"),
    seedDB    = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(body.urlencoded({extended : true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render("landing");
});


app.get("/camp",function(req,res){
    
    Campground.find( {} , function( err , campgrounds ){
        if(err)
            console.log(err);
        else
            res.render("index",{camp:campgrounds});
    });
});


app.post("/camp",function(req,res){
    var name  = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var obj={name:name,image:image , description : desc};
    Campground.create( obj , function( err , campground ){
        if(err)
            console.log(err);
        else
        {
            console.log("Newly Created : " + campground );
            res.redirect("/camp");
        }
    });
});


app.get("/camp/new",function(req,res){
    res.render("new");
});


app.get("/camp/:id" , function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err , foundCampground){
        if(err)
            console.log(err);
        else
            console.log(foundCampground);
            res.render("show" , {campground : foundCampground });
    });
    
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started.");
});