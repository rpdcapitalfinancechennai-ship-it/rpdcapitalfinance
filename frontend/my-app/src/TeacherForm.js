import { useState } from "react";
//import axios from "axios"

const TeacherForm = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [classs,setClasss] = useState('');
    const [section,setSection] = useState('');
    const [email,setEmail] = useState('');
    const [passWord,setPassWord ] = useState('');
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file); 
    formData.append("firstName", firstName);
    formData.append("lastName", lastName); 
    formData.append("classs", classs); 
    formData.append("section", section); 
    formData.append("email", email);  
    formData.append("passWord", passWord); 

    const res = await fetch("/teacher", {
      method: "POST",
      body: formData,
    });

    //const res = await axios.post("http://localhost:3001/fileupload", formData)
    console.log("res",res);
    const data = await res.json();
    console.log("data",data)
    if (data.success) {
      setUploadedUrl(`${data.url}`);
    } else {
      alert("Upload failed");
    }
  };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/teacher',{firstName,lastName,classs,section,email,passWord})
//         .then(res=>console.log(res.data))
//         .catch(err=>console.log(err.message))
//         alert(`firstName : ${firstName},
//             lastName : ${lastName},
//             class : ${classs},
//             section : ${section},
//             email : ${email},
//             password : ${passWord}`
//         )
//     setFirstName('');
//     setLastName('');
//     setClasss('');
//     setSection('');
//     setEmail('');
//     setPassWord('');
    
// }
    
    return(
        <>
            <h1>Teacher Registration Form</h1>
            <form onSubmit={handleUpload}>
                <label>First Name</label><br />
                <input type="text" value={firstName} name="firstName" onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter Your First Name"></input><br />
                <label>Last Name</label><br />
                <input type="text" value={lastName} name="lastName" onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Your Last Name"></input><br />
                <label>Class</label><br />
                <input type="text" value={classs} name="classs" onChange={(e)=>setClasss(e.target.value)} placeholder="Enter Your Class"></input><br />
                <label>Section</label><br />
                <input type="text" value={section} name="section" onChange={(e)=>setSection(e.target.value)} placeholder="Enter Your Section"></input><br />
                <label>Email</label><br />
                <input type="text" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input><br />
                <label>Password</label><br />
                <input type="text" value={passWord} name="passWord" onChange={(e)=>setPassWord(e.target.value)} placeholder="Enter Your password"></input><br />
                <input style={{ width : "50%" }} type="file" onChange={handleFileChange} />
                {file && <p>Selected file: {file.name}</p>}
                {uploadedUrl && (
                    <img
                    src={uploadedUrl}
                    alt="preview"
                    width="200"
                    style={{ marginTop: "10px" }}
                    />
                )}
                {/* <button className="logout" style={{ marginLeft : "5px" }} onClick={handleUpload}>Upload</button> */}
                <button type="submit">submit</button>
            </form>
        </>
    )
}
export default TeacherForm;