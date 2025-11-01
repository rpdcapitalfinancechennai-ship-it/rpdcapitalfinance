const express = require('express');
const session = require('express-session');
const app = express();
//const cors = require('cors');
//app.use(cors());
const mongoose  = require('mongoose');
const fileupload = require('express-fileupload');
app.use(fileupload());
const fs = require('fs');
const path = require('path');
if(!fs.existsSync('./uploads/students')) fs.mkdirSync('./uploads/students');
if(!fs.existsSync('./uploads/products')) fs.mkdirSync('./uploads/products');
if(!fs.existsSync('./uploads/carousel')) fs.mkdirSync('./uploads/carousel');
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.use(session({
  name: 'school',
  secret: 'qwertyuioplk',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,       
    sameSite: 'lax',      
    maxAge: 1000 * 60 * 60 
  }
}));
app.use(express.json());
const db_connect = mongoose.connect('mongodb://localhost:27017/school');
if(db_connect){
    console.log("Database connected");
}
const studentLoginRouter = require('./routes/StudentLogin');
app.use('/',studentLoginRouter);
const studentRouter = require('./routes/StudentPage')
app.use('/',studentRouter);
const studentTableRouter = require('./routes/studentTable');
app.use('/',studentTableRouter);

const teacherRouter = require('./routes/teacherPage');
app.use('/',teacherRouter);
const teacherLoginRouter  = require('./routes/teacherLogin');
app.use('/',teacherLoginRouter);
const teacherTableRouter = require('./routes/teacherTable');
app.use('/',teacherTableRouter);
const productRouter = require('./routes/ProductPage');
app.use('/',productRouter);
const carouselRouter = require('./routes/CarouselForm');
app.use('/',carouselRouter);
app.listen('3001', (err)=>{
    console.log("Running 3001");
})
app.get('/',(req,res)=>{
    res.send("backend running successfully");
})