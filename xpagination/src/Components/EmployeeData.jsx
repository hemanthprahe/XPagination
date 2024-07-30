import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EmployeeData = () => {
    const [empData , setEmpData] = useState([])
    const [page , setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
                setEmpData(response.data)
                const totalEmployees = response.data.length;
                setTotalPages(Math.ceil(totalEmployees / 10));
            }
            catch(err){
                alert("failed to fetch data")
            }
        }
        fetchData()
    },[])

    const prevPage = ()=>{
        if(page>1){
            setPage(page-1)
        }
    }

    const nextPage = ()=>{
        if(page<totalPages){
            setPage(page+1)
        }
    }

    const startIndex = (page - 1) * 10;
    const endIndex = Math.min(startIndex + 10, empData.length);

  return (
    <div>
        <h1>Employee Data Table</h1>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                    {empData.slice(startIndex, endIndex).map((employee)=>(
                        <tr>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
            <button onClick={prevPage}>Previous</button>
            <span>{page}</span>
            <button onClick={nextPage}>Next</button>
        </div>
    </div>
  )
}

export default EmployeeData