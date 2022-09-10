var mongoose = require("mongoose");
const DBConnect = async(url)=>{
    try{
        await mongoose.connect(url);
        console.log("connect with db");
    }
    catch(error){
        console.log("not connect with db");
    }
}
module.exports = DBConnect;