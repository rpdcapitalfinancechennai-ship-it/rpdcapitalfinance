const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    firstName : {type : String},
    lastName : { type : String},
    parName : { type : String },
    classs : { type : Number},
    section : { type : String},
    email : { type : String},
    passWord : {type : String},
    stu_login_attempt : {type : Number, default : 0},
    profile_pic: { type: String}
    }, {
        collection : 'student_information'

    })
module.exports = mongoose.model('student',studentSchema);