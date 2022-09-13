var mongoose = require('mongoose')

var StudentCourse = mongoose.Schema({
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    doj:{type:Date},
    status:{type:Number,require:true,default:1},
});

var StudentCourse = mongoose.model("student-course",StudentCourse)

module.exports = StudentCourse;