const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const bcrypt = require('bcrypt')
router.post('/stulogin', async (req,res)=>{
    try{
        const {email,passWord} = req.body;
        const checkEmail = await Student.findOne({email});
        console.log(checkEmail);
        if(checkEmail){
            if(checkEmail.stu_login_attempt < 3){
                const newPassword = await bcrypt.compare(passWord,checkEmail.passWord);
                if(newPassword){
                    await Student.updateOne(
                        {email : email},
                        {$set : { stu_login_attempt : 0}}
                        ) ;
                    req.session.studentId = checkEmail._id.toString();
                    req.session.studentEmail = checkEmail.email;
                    console.log("req.session.StudentId === ", req.session.studentId);
                    console.log("req.session.StudentEmail === ", req.session.studentEmail);
                    console.log("Login successfully");
                    return res.status(200).json({message : "Login successfully"});
                }
                else{
                    await Student.updateOne(
                        {email : email},
                        {$set : { stu_login_attempt : checkEmail.stu_login_attempt + 1}}
                        );
                    console.log("Invaild credentials");
                    return res.status(401).json({message : "Invaild credentials"});
                }
            }
            else{
                    console.log("You have 3 times more");
                    return res.status(403).json({message : "You have 3 times more"});
                }
        }
        else{
            console.log("Student doesn't exists");
            return res.status(404).json({message : "Sudent doesn't exists"});
        }
    }
    catch(err){
        console.log("Error message : ",err.message);
        return res.status(500).json({message : err.message});
    }
});
module.exports = router;
