var express = require("express");
var app = express();
var path = require("body-parser");
var router=require("./router/route");
var db = require("./config/db");
const bodyParser = require("body-parser");
var connect = db("mongodb://localhost/cws");
// require("express-dynamic-helpers-patch")(app)
// app.dynamicHelpers({
//     ayush:function(req,res){
//         return req.session;
//     }
// })

var session = require("express-session");
app.use(session({
    secret:"testing dasfasdfadsf fsafa sd",
    resave:false,
    saveUninitialized:false,
    
}))

var urlEncoded = bodyParser.urlencoded({extended:false});
app.use(urlEncoded);
app.use("/",router);

app.set("view engine","pug");
app.set("views","./public/view");

// app.use("/image",express.static(path.join(__dirname,"image")));
app.listen(8081);