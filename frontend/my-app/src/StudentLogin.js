import { useState } from "react";
import axios from "axios"

const StudentLogin = () => {
    const [email,setEmail] = useState('');
    const [passWord,setPassWord ] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/stulogin', {email,passWord})
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.message))
        alert(`
            Email : ${email},
            password : ${passWord},`
        )
    setEmail('');
    setPassWord('');
    }
    
    
    return(
        <>
            <h1>Student Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input><br />
                <label>Password</label><br />
                <input type="text" value={passWord} onChange={(e)=>setPassWord(e.target.value)} placeholder="Enter Your password"></input><br />
                <button type="submit">submit</button>
            </form>
        </>
    )
}
export default StudentLogin;
