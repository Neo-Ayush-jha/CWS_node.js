var express = require("express");
var router = express.Router();

var { insertStudent } = require("../controller/studentControllers");
var  {adminAuthorized, adminAuthorizedCheck}  = require("../middleware/adminMiddleware");
var { DashboardView, ManageStudent, InsertAdmin, AdminLogin, adminLogin, Login } = require("../controller/adminController");
const { InsertCourse, InsertCourseFrom, InsertCourseCategory, ManageCourse } = require("../controller/courseController");




// Admin Route start here
router.get('/admin/login', adminAuthorizedCheck, adminLogin);
router.post('/admin/login',Login);
router.get('/admin/dashboard',adminAuthorized,DashboardView);


router.get("/admin/new-student",adminAuthorized,ManageStudent);
// router.get("/admin/register",InsertAdmin); 

router.get("/apply" ,function(req,res){
    res.render("applyStudent");
});
router.post("/apply",insertStudent);

router.get("/admin/insert-course",adminAuthorized,InsertCourseFrom);
router.post("/admin/insert-course-category",adminAuthorized,InsertCourseCategory);
router.post("/admin/insert-course",adminAuthorized,InsertCourse);
// router.get("/admin/insert-course",adminAuthorized,ManageCourse);
router.get("/admin/manage-course",adminAuthorized,ManageCourse);
module.exports = router;