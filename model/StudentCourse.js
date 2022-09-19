var mongoose = require('mongoose')

var StudentCourse = mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    doj:{type:Date},
    status:{type:Number,require:true,default:1},
});

var StudentCourse = mongoose.model("StudentCourse",StudentCourse)

module.exports = StudentCourse;