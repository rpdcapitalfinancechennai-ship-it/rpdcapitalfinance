const express = require('express');
const router = express.Router();
const Student = require('../models/student')
router.get('/stutable', async (req,res)=>{
    const studentList = await Student.find();
    console.log("studenList == ",studentList)
    if(studentList){
       console.log("Data get successfully");
       return res.status(200).json({message : "Data get successfully",studentList});
    }
    else{
        console.log("Data Not Found");
        return res.status(400).json({message : "Data not found"});
        }
})
module.exports = router;