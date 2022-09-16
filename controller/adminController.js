var AdminModel = require("../model/adminModel");
var studentModel =require("../model/studentModels");
var CourseModel = require("../model/CourseModel");

// function InsertAdmin(req,res){
//             var admin= new AdminModel({
//             admin_email:"gmail",
//             admin_password:'123'
//         });
//         admin.save();
//     }
async function DashboardView(req,res){
    const newStudent =await studentModel.find({status:1}).countDocuments();
    const newCourse=await CourseModel.find().countDocuments();
    res.render("admin/dashboard",{"newStudent":newStudent,'newCourse':newCourse});
}

function adminLogin(req,res) {
    res.render("admin/login")
}
async function Login(req,res) {
    var{email,password}=req.body;
        var account = await AdminModel.findOne({email:email});
          if(account) {
            if(account.email === email && account.password === password){
                req.session.admin_id = account._id;
                res.redirect('/admin/dashboard');
                console.log('yes');
            }
            else{
                res.send("wrong email");
            }
          }
          else{
              res.send("wrong")
          }
}



function ManageStudent(req,res){
    studentModel.find({status:1},(error,response)=>{
        res.render("admin/manageStudent",{'student':response});
    });
}

module.exports={
    Login,
    adminLogin,
    ManageStudent,
    DashboardView,
    // InsertAdmin,
}