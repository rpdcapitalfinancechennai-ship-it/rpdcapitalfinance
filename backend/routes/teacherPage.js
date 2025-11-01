const express = require('express');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path');
const fs = require('fs');
router.post('/teacher', async (req,res)=>{
    console.log("req.body.firstName==" + req.body.firstName);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classs = req.body.classs;
    const section = req.body.section;
    const email = req.body.email;
    const passWord = req.body.passWord;
    //const {firstName,lastName,classs,section,email,passWord} = req.body;
    const checkEmail = await Teacher.findOne({email});
    if(!checkEmail){
        if (!req.files || !req.files.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
let file = req.files.file;
const uploadPath = path.join(__dirname, '../uploads/teachers', Date.now() + '_' + file.name);
//1209202518105643_tiger.jpg

file.mv(uploadPath, async(err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    const filename = path.basename(uploadPath);
        const hashedPassword = await bcrypt.hash(passWord,10);
        const teacherData = await Teacher.create({firstName,lastName,classs,section,email,passWord : hashedPassword, profile_pic: `/uploads/teachers${filename}`});
        if(teacherData){
            console.log("teacherData == " , teacherData);
           return res.status(201).json({
                        success: true,
                        message: "Student data created",
                        url: `/uploads/teachers/${filename}`,
                        teacherData,
                    });
        }
        else{
            console.log("teacherData == " , teacherData);
            res.json({message : "Teacher Not Created"});
        }
    });
    }
    else{
        console.log("Data Exists");
        res.json({ message : "Data Exists"});
    }
})
module.exports = router;