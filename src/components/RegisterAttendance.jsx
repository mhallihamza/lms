import React from 'react';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
const AttendanceList = () => {
    const {user,loading,error,dispatch} = useContext(AuthContext)
    let cls;
    if(user.role==="admin"){
    const {data,err,refetch} = useFetch("http://localhost:3000/class");
     cls = data.data;
    console.log(cls);
    } else {
      const {data,err,refetch} = useFetch("http://localhost:3000/class/teacher/"+ user._id);
      cls = data.data;
    console.log(cls);
    }
    const [newcls,setnewcls] = useState();
    const [selectcls,setselectcls] = useState("");
    const [date,setdate] = useState("");
    const [attendance,setattendance]= useState("");
    const [create,setcreate] = useState();
    useEffect(() => {
      if (newcls && newcls.length > 0) {
        setcreate(newcls[0].students.map(student => ({
          user: student._id,
          status: 'Present'
        })));
      }
    }, [newcls]);
    const handleget = event => {
      event.preventDefault();
      axios.get("http://localhost:3000/attendance/"+date+"/" + selectcls)
            .then((res)=>{
              setattendance(res.data ? res.data.students : null)
              const filter = cls.filter(cs=>cs.name===selectcls);
              setnewcls(filter);
              console.log(newcls)
            })
            .catch((error)=>{
              console.log(error)
            })
  };
  console.log(newcls);
  console.log(create);
  const handleStatusChange = (userId, status) => {
    setattendance(prevAttendance => {
      return prevAttendance.map(student => {
        if (student.user._id === userId) {
          return { ...student, status: status };
        } else {
          return student;
        }
      });
    });
  };
  const handleStatusChange1 = (userId, status) => {
    create && setcreate( prevAttendance => {
      const index = prevAttendance.findIndex(a => a.user === userId);
      const updatedAttendance = [...prevAttendance];
      updatedAttendance[index].status = status;
      return updatedAttendance;
    });
  };
  
  const handlepost = e => {
    e.preventDefault();
    axios.post("http://localhost:3000/attendance", {date,class:selectcls,students:create})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }
  const handleput = e => {
    e.preventDefault();
    axios.put("http://localhost:3000/attendance", {date,class:selectcls,students:attendance})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }
  return (
    <>
    <div className='mb-5'>
       <h1 className='text-xl font-semibold'>Student Attendance</h1>
        <h2 className='text-slate-700'>Attendance</h2>
    </div>
    <div className='flex justify-center gap-5 mb-10'>
      <input className='bg-slate-200 border-2 border-cyan-600 rounded' type='date' onChange={(e)=>setdate(e.target.value)} placeholder='Date' id='date'></input>
      <select className='bg-slate-200 border-2 border-cyan-600 rounded' onChange={(e)=>setselectcls(e.target.value)}>
        <option selected disabled hidden>Select Class</option>
        {cls && cls.map(cs=>(
          <option key={cs._id} value={cs.name}>{cs.name}</option>
        ))}
      </select>
      <button onClick={handleget} className={`bg-blue-700 text-white w-[10rem] border border-blue-700 rounded text-l  py-1 hover:bg-blue-800" ${selectcls && date ? "" : "hidden"}`}>Get Student List</button>
    </div>
    <div className="overflow-x-auto">
      <div className='border-2 h-12 rounded-sm border-solid pl-4 pt-2 text-lg font-semibold'>Attendances</div>
      <table className="table-auto w-full">
        <thead className='bg-slate-200'>
          <tr>
            <th className="px-4 py-2 border-x-2">Image</th>
            <th className="px-4 py-2 border-x-2">Name</th>
            <th className="px-4 py-2 border-r-2">Status</th>
          </tr>
      </thead>
      <tbody>
  {attendance === null ?
    newcls && newcls[0].students.map(student => (
      <tr key={student._id}>
        <td className="border-2 px-4 py-2">
          <img src={student.image ? student.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="yes" className="h-8 w-8 rounded-full" />
        </td>
        <td className="border-2 px-4 py-2">{student.username}</td>
        <td className="border-2 px-4 py-2">
        <select value={create && create.find(a => a.user === student._id)?.status} onChange={(e) => {handleStatusChange1(student._id, e.target.value)}}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </td>
      </tr>
    )) :
    attendance && attendance.map(student => (
      <tr key={student._id}>
        <td className="border-2 px-4 py-2">
          <img src={student.user.image ? student.user.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="yes" className="h-8 w-8 rounded-full" />
        </td>
        <td className="border-2 px-4 py-2">{student.user.username}</td>
        <td className="border-2 px-4 py-2">
          <select value={student.status} onChange={(e) => handleStatusChange(student.user._id, e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </td>
      </tr>
    ))
  }
</tbody>

      </table>
    </div>
    <div className='border-x-2 h-6 rounded-sm border-solid'></div>
    <div className='border-2 h-16 rounded-sm border-solid bg-slate-200'>
        <button onClick={attendance===null ? handlepost : handleput}  className='bg-blue-700 ml-4 mt-3 text-white w-[6.5rem] border border-blue-700 rounded text-l  py-[0.3rem] hover:bg-blue-800'>Save All</button>
    </div>
    </>
  );
}

export default AttendanceList;
