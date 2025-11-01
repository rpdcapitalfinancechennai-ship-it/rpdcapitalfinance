const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Student = require('../models/student');
router.get('/teatable', async (req,res) =>{
    //const teaList =  await Teacher.find();
    const teacherClass = req.session.TeacherClass;
    const teacherSection = req.session.TeacherSection;
    console.log("Teacher class === ", teacherClass);
    console.log("teacherSection === ", teacherSection);
    const stuList = await Student.find({
        classs : teacherClass,
        section : teacherSection
    });
    if(stuList){
        res.json({
            //teachers: teaList,
            students: stuList
        });
        //console.log("Teacher List ==",teaList);
        console.log("student List == ", stuList);
    }
    else{
        console.log("Not found");
    }
});
module.exports = router;