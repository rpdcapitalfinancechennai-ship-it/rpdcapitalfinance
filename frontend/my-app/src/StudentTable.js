import axios from "axios";
import { useEffect, useState } from "react";

const StudentTable = () => {
    const [datas,setDatas] = useState([]);
       useEffect(()=>{
       axios.get('/stutable')
        .then((res)=>{
            setDatas(res.data.studentList);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err.message);
        })
       },[]);
       
    return(
        <>
            <h1>Student Table</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Parent Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Email</th>
                        <th>Images</th>
                    </tr>
                </thead>
                <tbody>
                       {datas.length > 0 ? (
                                datas.map((data) => (
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
                                                src={data.profile_pic}
                                                alt={data.firstName}
                                                width="80"
                                                height="80"
                                                style={{ borderRadius: "8px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                `${data.firstName}`
                                            )}
                                        </td>
                                    </tr>
                                    ))
                            ) : (
                                <tr>
                                <td colSpan={6}>No data found</td>
                                </tr>
                            )}
                </tbody>
            </table>
        </>
    )
}
export default StudentTable;