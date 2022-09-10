const res = require("express/lib/response");
const StudentModel = require("../model/studentModels"); 


function insertStudent(req,res){
    var student =new StudentModel({
        name:req.body.name,
        father:req.body.father,
        email:req.body.email,
        contact:req.body.contact,
        address:req.body.address,
        gender:req.body.gender,
        education:req.body.education,
        password:req.body.password
    });
    student.save();
    res.redirect("/apply");
}
module.exports ={
    insertStudent,
}