const express = require("express");
const app = express();
const bodyParser=require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));
//telling express explicitly to use the static files publicly.
//for that we need to specify the path of static files.
app.use(express.static("public"));
app.set("view engine","ejs");
var items=[];
var workitems = [];


app.get("/",(req,res)=>{
   let today = new Date();
   let options = {day:"numeric",
                  weekday:"long",
                  month:"long",
                  year:"numeric"}

   let day = today.toLocaleDateString("en-US", options);
   
   res.render("list",{listTitle:day,listitems:items});

});

app.post("/",(req,res)=>{
    let item=req.body.newlistitem;
    
    // we are using the dynamic value of button for different routes

    if(req.body.btn === "Work"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
    console.log(req.body);
    
    
});



app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List",listitems:workitems});
});


app.get("/about",(req,res)=>{
   res.render("about");
});


// app.post("/work",(req,res)=>{
//     var witem = req.body.newlistitem;
//     workitems.push(witem);
    
    
//     res.redirect("/work");
// });

app.listen(3000,()=>{
    console.log("Server starts at localhost 3000");
    
})