var express     = require("express"),
     app        = express(),
     body       = require("body-parser"),
     mongoose   = require("mongoose"),
     Campground = require("./models/camp"),
     seedDB = require("./seeds");
     
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(body.urlencoded({extended : true}));
app.set("view engine","ejs");


// Campground.create({ name : "Granite Hill",
//     image : "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?h=350&auto=compress&cs=tinysrgb" ,
//     description : "This is a huge granite hill, no bathrooms, no water. Beautiful Granite." } ,
//     function(err,campground){
//         if(err)
//             console.log(err);
//         else
//             console.log("Successfully added: " + campground);
//     });


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
    Campground.findById(id , function(err , foundCampground){
        if(err)
            console.log(err);
        else
            res.render("show" , {campground : foundCampground });
    });
    
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started.");
});