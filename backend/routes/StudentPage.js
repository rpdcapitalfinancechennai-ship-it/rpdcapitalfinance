const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const Student = require('../models/student');
const { url } = require('inspector');
router.post('/student', async(req,res) => {
   try{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const parName = req.body.parName;
    const classs = req.body.classs;
    const section = req.body.section;
    const email = req.body.email;
    const passWord = req.body.passWord;
    const files = req.body.files;
   console.log("data",req.body)
   const studentEmail = await Student.findOne({email});
   console.log("studentEmail == ", studentEmail)
   if(!studentEmail){
        if(!req.files || !req.files.files){
            return res.status(400).json({status : false, message : "No uploaded file"});
        }
        let files = req.files.files;
  // ensure it's always an array
        if (!Array.isArray(files)) 
            files = [files];
        const uploaded = [];
        //[tiger.jpg.lion.jpg,zebra.jpg]
        files.forEach((file) => {
            const uploadPath = path.join(__dirname, '../uploads/students', Date.now() + '_' + file.name);
            file.mv(uploadPath, (err) => {
            if (err) console.error(err);
            });
            uploaded.push({ filename: path.basename(uploadPath), url: `/uploads/${path.basename(uploadPath)}` });
        });

        res.json({ success: true, files: uploaded });
        // const file = req.files.file;
        // const uploadPath = path.join(__dirname,'../uploads/students', Date.now() + "_" + file.name);
        // console.log("uploadpath == ", uploadPath);
        // file.mv(uploadPath, async(err)=>{
        // if (err) return res.status(400).json({status : false, message : "No file upload"})
        // const filename = path.basename(uploadPath);
        //NEEDED CODES START
        // const hashedPassword = await bcrypt.hash(passWord,10);
        // console.log("hashedPassword == ",hashedPassword);
        // const studentData = await Student.create({firstName,lastName,parName,classs,section,email,passWord : hashedPassword, profile_pic : `/uploads/students/${filename}`});
        //     if(studentData){
        //             console.log("Student Data === ", studentData);
        //             return res.status(201).json({
        //                 success : true,
        //                 url : `/uploads/students/${filename}`,
        //                 message: "Student data created",studentData
        //             });
        //     }
        //     else{
        //         console.log("Student data not created");
        //         return res.status(500).json({message : "Student data not created"});
        //     }
        //NEEDED CODES END
    //  })
}
    else{
        console.log("Student already Exists");
        return res.status(409).json({message : "Student already Exists"});
    }
    }
   catch(err){
        console.log("Err message : ",err.message)
        return res.status(500).json({message : err.message});
   }
})
module.exports = router;