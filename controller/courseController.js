const {response} = require("express");
var CourseModel = require("../model/CourseModel");
var CourseCategoryModel = require("../model/CourseCategoryModel");
var StudentCourse = require("../model/StudentCourse");
const moment = require("moment");

async function getUser(req){
    std= await StudentCourse.findById(req.session.student_id);
    return std;
}
function InsertCourseCategory(req,res){
    var courseCat = new CourseCategoryModel({
        cat_title : req.body.cat_title,
        cat_description : req.body.cat_discription,
    });
    courseCat.save();
    res.redirect("/admin/insert-course");
}
function InsertCourseFrom(req,res){
    var data = CourseCategoryModel.find({},(error,response)=>{
        res.render("admin/insertCourse",{'category':response});
    });
}
// function InsertCourse(req,res){
//     var course = new CourseModel({
//         title:req.body.name,
//         instructor:req.body.instructor,
//         duration:req.body.duration,
//         price:req.body.price,
//         discount_price:req.body.discount_price,
//         category_id:req.body.category_id,
//         description:req.body.description,
//     })
//     course.save();
//     res.redirect("/admin/insert-course");
// }
class  InsertCourse{
    static insert = async(req,res)=>{
        try{
            var course = new CourseModel({
                image:req.file.filename,
                title:req.body.name,
                instructor:req.body.instructor,
                duration:req.body.duration,
                price:req.body.price,
                discount_price:req.body.discount_price,
                category_id:req.body.category_id,
                description:req.body.description,
            })
            await course.save();
            console.log(req.file.filename);
            console.log('data inserted successfully');
        }catch(error){
            console.log(error);
        }
        res.redirect("/admin/insert-course");
    }
}
async function ManageCourse(req, res){
    var data = await CourseModel.find({}).populate("category_id");
    res.render("admin/manageCourse",{"courses": data})
    // res.render("admin/insert-course",{"courses": data})
}
async function SingelCourse(req,res){
    let id =req.params.id;
    const data = await CourseModel.findById(id); 
    res.render("singleCourse",{'course':data});

}


async function addStudentCourse(req,res){
    std = await getUser(req);
    var stdCourse = await StudentCourse.findOne({'studentId':std._id,"courseId":req.body.courseId})
    console.log("hello this",stdCourse)
        if(stdCourse){
            res.render("/student/home");
        }
        else{
            var currentDate = new Date();
            var stdCourse = StudentCourse.create({
                studentId:std._id,
                courseId:req.body.courseId,
                doj:currentDate,
                status:1,
            });
            stdCourse.save();
            res.redirect("/student/home");
            console.log('stdCourse');
        }
    }
async function manageCourseStudent(req,res){
    std = await getUser(req);
    stdCourse = await CourseModel.find({});
    res.render("singleCourse",{'student':std,"course":stdCourse});
    console.log("gcgcccgh");
}
module.exports = {
    InsertCourse,
    ManageCourse,
    SingelCourse,
    addStudentCourse,
    InsertCourseFrom,
    manageCourseStudent,
    InsertCourseCategory,
}