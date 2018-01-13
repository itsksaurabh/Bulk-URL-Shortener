var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    GoogleURL   = require( 'google-url' );
 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


var googleUrl = new GoogleURL( { key: 'Your Real Key Here' });


//Routes

app.get("/", function(req,res){
    
   res.render("index"); 
    
});

app.get("/results", function(req,res){
    
    res.redirect("/");
    
})


app.post("/results", function(req,res){
    
   var urlList = req.body.urls.split("\n");
   var shortUrlList = [];
    
   for(var i=0;i<urlList.length;i++){
       
        googleUrl.shorten(urlList[i], function( err, shortUrl ) {
        
        if(err){
            console.log(err);
            res.send("Please Enter valid URL");
        }
        else {
            
             shortUrlList.push(shortUrl);

            if(urlList.length ===  shortUrlList.length){
                 res.render("results", { List : {shortUrlList} });
             }
    
        }
    });
    }
  
   
    
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has Started...");
});
