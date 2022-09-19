var express = require("express");
var router = express.Router();

var { insertStudent, Course, Home, studentHome, studentLogin,studentLoginCheck } = require("../controller/studentControllers");
var  {adminAuthorized, adminAuthorizedCheck}  = require("../middleware/adminMiddleware");
var  {studentAuthorized, studentAuthorizedCheck}  = require("../middleware/studentMiddleware");
var { DashboardView, ManageStudent, InsertAdmin, AdminLogin, adminLogin, Login } = require("../controller/adminController");
const { InsertCourse, InsertCourseFrom, InsertCourseCategory, ManageCourse,SingelCourse,manageCourseStudent,addStudentCourse } = require("../controller/courseController");
const upload = require("../middleware/upload")




// Admin Route start here
router.get('/admin/login', adminAuthorizedCheck, adminLogin);
router.post('/admin/login',Login);
router.get('/admin/dashboard',adminAuthorized,DashboardView);


router.get("/admin/new-student",adminAuthorized,ManageStudent);
// router.get("/admin/register",InsertAdmin); 


// student Routestart here
router.get('/student/login', studentAuthorizedCheck, studentLogin);
router.post('/student/login', studentLoginCheck);
router.get("/student/homes",studentAuthorized,studentHome);


router.get("/apply" ,function(req,res){
    res.render("applyStudent");
});
router.post("/apply",insertStudent);
router.get("/",Home);

// course
router.get("/admin/insert-course",adminAuthorized,InsertCourseFrom);
router.post("/admin/insert-course-category",adminAuthorized,InsertCourseCategory);
router.post("/admin/insert-course",adminAuthorized,upload.single('image'),InsertCourse.insert);
router.get("/admin/manage-course",adminAuthorized,ManageCourse);
router.get("/admin/manage-course",adminAuthorized,ManageCourse);

router.get("/singleCourse/:id",SingelCourse);

router.post("/student/home",studentAuthorized,addStudentCourse);
router.get("/student/home",studentAuthorized,manageCourseStudent);

module.exports = router;