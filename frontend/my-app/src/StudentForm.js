import { useState } from "react";
//import axios from "axios"

const StudentForm = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [parName,setParName] = useState('');
    const [classs,setClasss] = useState('');
    const [section,setSection] = useState('');
    const [email,setEmail] = useState('');
    const [passWord,setPassWord ] = useState('');
    // const [file,setFile] = useState('');
    const [files,setFiles] = useState('');
    // const [uploadedUrl, setUploadedUrl] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleChange = (e) => {
      const files = e.target.files;
      setFiles(e.target.files);
      setSelectedFiles(Array.from(files));
    }
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('firstName',firstName);
      formData.append('lastName',lastName);
      formData.append('parName',parName);
      formData.append('classs',classs);
      formData.append('section',section);
      formData.append('email',email);
      formData.append('passWord',passWord);
      for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // must match req.files.files
      }
      // formData.append('file',file);
      const res = await fetch('/student',{
        method : 'POST',
        body : formData
      });
      console.log("res==", res)
      const data = await res.json();
      console.log("Data == ", data);
      if (data.success) {
      // setUploadedUrl(`${data.url}`);
      
    } else {
      alert("Upload failed");
    }
    }
    /* const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/student',{firstName,lastName,parName,classs,section,email,passWord})
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.message))
        alert(`firstName : ${firstName},
            lastName : ${lastName},
            parName : ${parName},
            class : ${classs},
            section : ${section},
            Email : ${email},
            password : ${passWord},`
        )
    setFirstName('');
    setLastName('');
    setParName('');
    setClasss('');
    setSection('');
    setEmail('');
    setPassWord('');
    } */
    
    return(
        <>
            <h1>Student Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name</label><br />
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter Your First Name"></input><br />
                <label>Last Name</label><br />
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Your Last Name"></input><br />
                <label>Parents Name</label><br />
                <input type="text" value={parName} onChange={(e)=>setParName(e.target.value)} placeholder="Enter Your Parents Name"></input><br />
                <label>Class</label><br />
                <input type="text" value={classs} onChange={(e)=>setClasss(e.target.value)} placeholder="Enter Your Class"></input><br />
                <label>Section</label><br />
                <input type="text" value={section} onChange={(e)=>setSection(e.target.value)} placeholder="Enter Your Section"></input><br />
                <label>Email</label><br />
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input><br />
                <label>Password</label><br />
                <input type="password" value={passWord} onChange={(e)=>setPassWord(e.target.value)} placeholder="Enter Your password"></input><br />
                <input type="file" onChange={handleChange} multiple></input>
                {/* {files && <p>Selected file : {files.name}</p>} */}
                {selectedFiles.length > 0 && (
        <div>
          <h4>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
                <button type="submit">submit</button>
                {/* {
                  uploadedUrl && 
                  <img src={uploadedUrl} alt="preview"></img>
                } */}
            </form>
        </>
    )
}
export default StudentForm;