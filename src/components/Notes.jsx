import React from 'react'
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
export default function Notes() {
    const {Api_url} =  useContext(ApiContext);
    const [selectcls,setselectcls] = useState("");
    const [selectexam,setselectexam] = useState("");
    const [notes,setnotes] = useState("");
    const [create,setcreate] = useState();
    const {user,loading,error,dispatch} = useContext(AuthContext)
    let cls;
    if(user.role==="admin"){
    const {data,err,refetch} = useFetch(Api_url+"/class");
    const { data: examData, err: examError, refetch: examRefetch } =useFetch(Api_url+"/exam/admin/"+ selectcls,[selectcls]);
    var exams = examData?.data;
     cls = data.data;
    console.log(cls);
    } else {
      const {data,err,refetch} = useFetch(Api_url+"/class/teacher/"+ user._id);
      const { data: examData, err: examError, refetch: examRefetch } =useFetch(Api_url+"/exam/class/"+ user._id + "/" + selectcls,[selectcls]);
      var exams = examData?.data;
      cls = data.data;

    console.log(cls);
    }
    
    const [newcls,setnewcls] = useState();
    console.log(notes);
    useEffect(() => {
      if (newcls && newcls.length > 0) {
        setcreate(newcls[0].students.map(student => ({
          exam : selectexam,
          student: student._id,
          instructor: user._id,
          class : selectcls,
          note : 0
        })));
      }
    }, [newcls]);
    const getdata1 = event => {
      event.preventDefault();
      axios.get(Api_url+"/note/admin/"+ selectcls + "/" + selectexam)
            .then((res)=>{
              setnotes((res.data).length  ? res.data : null)
              console.log(notes)
              const newcls = cls.filter(cs=>cs._id===selectcls)
              setnewcls(newcls);
            })
            .catch((error)=>{
              console.log(error)
            })
  };
    const getdata = event => {
      event.preventDefault();
      axios.get(Api_url+"/note/teacher/"+user._id+"/" + selectcls + "/" + selectexam)
            .then((res)=>{
              setnotes((res.data).length  ? res.data : null)
              console.log(notes)
              const newcls = cls.filter(cs=>cs._id===selectcls)
              setnewcls(newcls);
            })
            .catch((error)=>{
              console.log(error)
            })
  };
  console.log(create)
  const handleStatusChange = (userId, note) => {
    setnotes(prevNote => {
      return prevNote.map(student => {
        if (student.student._id === userId) {
          return { ...student, note: note };
        } else {
          return student;
        }
      });
    });
  };
  const handleStatusChange1 = (userId, note) => {
    create && setcreate( prevNote => {
      const index = prevNote.findIndex(a => a.student === userId);
      const updatedNote = [...prevNote];
      updatedNote[index].note = note;
      return updatedNote;
    });
  };
  const handlepost = e => {
    e.preventDefault();
    axios.post(Api_url+"/note",create)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }
  const handleput = e => {
    e.preventDefault();
    axios.put(Api_url+"/note",notes)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }
  return (
    <div>
        <div className='mb-5'>
       <h1 className='text-xl font-semibold'>Exam Notes</h1>
        <h2 className='text-slate-700'>Exam</h2>
        <div className='flex justify-center gap-5 mb-10'>
      <select className='bg-slate-200 border-2 border-cyan-600 rounded' onChange={(e)=>setselectcls(e.target.value)}>
        <option selected disabled hidden>Select Class</option>
        {cls && cls.map(cs=>(
          <option key={cs._id} value={cs._id}>{cs.name}</option>
        ))}
      </select>
      <select className={`bg-slate-200 border-2 border-cyan-600 rounded ${selectcls ? "" : "hidden"}`} onChange={(e)=>setselectexam(e.target.value)}>
        <option selected disabled hidden>Select Exam</option>
        {exams && exams.map(cs=>(
          <option key={cs._id} value={cs._id}>{cs.subject}</option>
        ))}
      </select>
      <button onClick={user.role === "instructor"  ? getdata: getdata1} className={`bg-blue-700 text-white w-[10rem] border border-blue-700 rounded text-l  py-1 hover:bg-blue-800 ${selectexam ? "" : "hidden"}`}>Load Data</button>
    </div>
    </div>
    <div className="overflow-x-auto">
      <div className='border-2 h-12 rounded-t-md shadow-sm border-solid pl-4 pt-2 text-lg font-semibold'>Notes</div>
      <table className="table-auto w-full">
        <thead className='bg-slate-200'>
          <tr>
            <th className="px-4 py-2 border-x-2">Image</th>
            <th className="px-4 py-2 border-x-2">Name</th>
            <th className="px-4 py-2 border-r-2">Class</th>
            <th className="px-4 py-2 border-r-2 w-[22rem]">Note</th>
          </tr>
      </thead>
      <tbody>
  {notes === null ?
    newcls && newcls[0].students.map(student => (
      <tr key={student._id}>
        <td className="border-2 px-4 py-2">
          <img src={student.image ? student.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="yes" className="h-8 w-8 rounded-full" />
        </td>
        <td className="border-2 px-4 py-2">{student.username}</td>
        <td className="border-2 px-4 py-2">{newcls[0].name}</td>
        <td className="border-2 px-4 py-2">
          <input className='border-2 border-solid w-[15rem]' type="number" value={create && create.find(a => a.student === student._id)?.note} onChange={(e) => {handleStatusChange1(student._id, e.target.value)}} ></input>
        </td>
      </tr>
    )) :
    notes && notes.map(note => (
      <tr key={note._id}>
        <td className="border-2 px-4 py-2">
          <img src={note.student.image ? note.student.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="yes" className="h-8 w-8 rounded-full" />
        </td>
        <td className="border-2 px-4 py-2">{note.student.username}</td>
        <td className="border-2 px-4 py-2">{note.class.name}</td>
        <td className="border-2 px-4">
          <input className='border-2 border-solid w-[20rem] h-9 pl-3' type='number' value={note.note} onChange={(e) => handleStatusChange(note.student._id, e.target.value)} ></input>
        </td>
      </tr>
    ))
  }
</tbody>

      </table>
    </div>
    <div className='border-x-2 h-6 rounded-sm border-solid'></div>
    <div className='border-2 shadow-sm h-16 rounded-b-md border-solid bg-slate-200'>
        <button onClick={notes===null ? handlepost : handleput} className='bg-blue-700 ml-4 mt-3 text-white w-[6.5rem] border border-blue-700 rounded text-l  py-[0.3rem] hover:bg-blue-800'>Save All</button>
    </div>
    </div>
  )
}
