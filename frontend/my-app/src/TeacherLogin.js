import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const TeacherLogin = () => {
    const [email,setEmail] = useState('');
    const [passWord,setPassWord] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/tealogin',{email,passWord})
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.message))
        alert(`
            class : ${email},
            section : ${passWord}`
        )
        navigate('/teatable');
    setEmail('');
    setPassWord('');
    }
    
    return(
        <>
            <h1>Teacher Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input><br />
                <label>Section</label><br />
                <input type="password" value={passWord} onChange={(e)=>setPassWord(e.target.value)} placeholder="Enter Your Password"></input><br />
                <button type="submit">submit</button>
            </form>
        </>
    )
}
export default TeacherLogin;