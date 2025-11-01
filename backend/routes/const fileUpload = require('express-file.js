const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
app.use(fileUpload());

// optional: make sure upload folder exists
if (!fs.existsSync('./uploads/teachers')) fs.mkdirSync('./uploads/teachers');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
if (!fs.existsSync('./uploads/students')) fs.mkdirSync('./uploads/students');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.use(cors());