const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');
router.post('/tealogin', async (req,res) => {
    try{
    const {email,passWord} = req.body;
    const checkEmail = await Teacher.findOne({email});
    console.log(checkEmail);
    if(checkEmail){
        if(checkEmail.login_attempt < 3){
            const newPassword = await bcrypt.compare(passWord,checkEmail.passWord);
            if(newPassword){
                req.session.TeacherId = checkEmail._id.toString();
                req.session.TeacherEmail = checkEmail.email;
                req.session.TeacherClass = checkEmail.classs;
                req.session.TeacherSection  = checkEmail.section;
                console.log("req.session.TeacherId === ", req.session.TeacherId);
                console.log("req.session.TeacherEmail === ", req.session.TeacherEmail); 
                console.log("req.session.TeacherClass === ", req.session.req.session.TeacherClass);
                console.log("req.session.TeacherSection === ", req.session.TeacherSection); 
                await Teacher.updateOne(
                    {email : email},
                    {$set : {login_attempt : 0}}
                );
                console.log("Login Successfully");
                return res.status(200).json({message : "Login Successfully"});
            } 
            else{
                console.log("Data invalid");
                res.json({message : "Data invalid"});
                await Teacher.updateOne(
                    {email : email},
                    {$set : {login_attempt : checkEmail.login_attempt + 1}}
                )
                return res.status(401).json({message : "Invalid credantials"})
            }  
        } 
        else{
            console.log("You have 3 times more");
            return res.status(403).json({message : "You have 3 times more"});
        }
    }
    else{
        console.log("User not Exists");
        return res.status(404).json({message : "User not Exists"});
    }
    }
    catch(err){
        console.log("Error message : ", err.message);
        return res.status(500).json({message : err.message});
    }
})
module.exports = router;