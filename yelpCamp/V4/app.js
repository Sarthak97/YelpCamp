var express   = require("express"),
     app      = express(),
     body     = require("body-parser"),
     mongoose = require("mongoose"),
   Campground = require("./models/camp"),
    seedDB    = require("./seeds"),
    Comment   = require("./models/comments");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(body.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


app.get("/",function(req,res){
    res.render("landing");
});


app.get("/camp",function(req,res){
    
    Campground.find( {} , function( err , campgrounds ){
        if(err)
            console.log(err);
        else
            res.render("campground/index",{camp:campgrounds});
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
    res.render("campground/new");
});


app.get("/camp/:id" , function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err , foundCampground){
        if(err)
            console.log(err);
        else
            //console.log(foundCampground);
            res.render("campground/show" , {campground : foundCampground });
    });
    
});


//======================================//
//Comment Section

app.get("/camp/:id/comment/new" , function(req, res) {
    Campground.findById(req.params.id , function(err , camp) {
        if(err)
            console.log(err);
        else
            res.render("comment/new" , { campground : camp });
    });
});


app.post("/camp/:id/comment" , function(req, res) {
    Campground.findById(req.params.id , function(err, camp) {
        if(err)
            {
                console.log(err);
                res.redirect("/camp");
            }
        else
            {
                Comment.create(req.body.comment , function(err , comment){
                    if(err)
                        console.log(err);
                    else
                        camp.comments.push(comment);
                        camp.save();
                        res.redirect("/camp/"+req.params.id);
                })
            }
    });
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started.");
});