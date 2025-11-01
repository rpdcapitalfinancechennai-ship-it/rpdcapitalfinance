const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    firstName : { type : String },
    lastName : { type : String },
    classs : { type : Number },
    section : { type : String},
    email : { type : String },
    passWord : { type : String},
    login_attempt : { type : Number, default : 0 },
    profile_pic: { type: String}
},
{
    collection : 'teacher_information'
}
)
module.exports = mongoose.model('Teacher',teacherSchema);