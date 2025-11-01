import axios from "axios";
import { useEffect, useState } from "react";

const TeacherTable = () => {
    const [sdatas,setSDatas] = useState([]);
    useEffect(()=>{
        axios.get('/teatable')
        .then((res)=>{
            setSDatas(res.data.students)
            console.log(res.data);
        })
        .catch(err=>console.log(err.message));
    },[])
    return(
        <>
            {/*<h1>Teacher List</h1>
            <table style={{ margin : "20px"}}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tdatas.length > 0 ? (
                            tdatas.map((data)=>
                                <tr key={data._id}>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.classs}</td>
                                    <td>{data.section}</td>
                                    <td>{data.email}</td>
                                </tr>
                            )
                        ) : (
                             <tr>
                                <td colSpan={6}>User Not found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>*/}
            <h1>Student table</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Parents Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Email</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {sdatas.length > 0 ? (
                        sdatas.map((data)=>(
                            <tr key={data._id}>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.parName}</td>
                                <td>{data.classs}</td>
                                <td>{data.section}</td>
                                <td>{data.email}</td>
                                <td>
                                    {data.profile_pic ? (
                                                <img
                                                src={`http://localhost:3001${data.profile_pic}`}
                                                alt={data.firstName}
                                                width="80"
                                                height="80"
                                                style={{ borderRadius: "8px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                "No Image"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan={6}>User Not found</td></tr>
                    )
                    }
                    
                </tbody>
            </table>
        </>
    )
}
export default TeacherTable;