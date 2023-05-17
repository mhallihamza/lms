import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
function AddExam() {
    const navigate = useNavigate();
    const {Api_url} = useContext(ApiContext);
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const [create, setcreate] = useState({
        date : undefined,
        subject : undefined,
        startTime : undefined,
        endTime : undefined,
        room : undefined,
        course : undefined,
     });
     const handleChange =  (e)=>{
        setcreate((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
    if(user.role==="admin"){
        var {data:courseData,err:courseError,refetch:courseReftech} = useFetch(Api_url+"/course")
        var courses = courseData.data;
        } else {
          var {data:courseData,err:courseError,refetch:courseReftech} = useFetch(Api_url+"/course/teacher/"+ user._id)
          var courses = courseData.data;
        }
        const handleClick = e => {
            e.preventDefault();
            console.log(create);
            axios.post(`${Api_url}/exam`, create)
              .then(res => {
                console.log(res)
                axios.get(`${Api_url}/course`)
                .then(res => {
                  const course = res.data?.filter(course=>course._id===create.course);
                  console.log(res);
                  axios.get(`${Api_url}/class`)
                  .then(res => {
                    console.log(res);
                    const filteredClasses = res.data?.filter(cls => {
                      const clsCourses = cls.courses.map(course => course._id);
                      return clsCourses.includes(course._id);
                    });
                    const studentIds = filteredClasses.flatMap(cls => cls.students.map(student => student._id));
                    console.log(studentIds);
                    axios.post(`${Api_url}/notification`, {
                      sender : user._id,
                      message : `you have exam in ${create.subject} after ${parseInt(((new Date(create.date)).getTime() - (new Date()).getTime()) / (24 * 60 * 60 * 1000),10)} days`,
                      receiverIds : studentIds
                    })
                    .then(notification=>{
                      console.log(notification)
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                })
                .catch(err => {
                  console.log(err);
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
  return (
    <div>
         <div>
         <div>
            <h2 className='text-xl'>Create Exam</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>EXAM</h4>
            </div>
    </div>
    <div className='mt-4 rounded-lg shadow-sm border mb-4'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Create New Exam</h1>
            <button onClick={()=>navigate("/Accueil/Exam_List")} class="flex items-center justify-center mt-2 mr-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span>Back</span>
            </button>
        </div>
        <form className="max-w-xl mx-auto p-6">
            <div className='mb-6 flex'>
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Date"
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subject"
            type="text"
            placeholder="Subject"
            onChange={handleChange}
          />
        </div>
        </div>
        <div className='mb-6 flex'>
        <div className="w-1/2 mr-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="start-time"
          >
            Start Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startTime"
            type="time"
            placeholder="Start Time"
            onChange={handleChange}
            />
            </div>
            <div className="w-1/2 ml-2">
            <label
                     className="block text-gray-700 font-bold mb-2"
                     htmlFor="end-time"
                   >
            End Time
            </label>
            <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="endTime"
                     type="time"
                     placeholder="End Time"
                     onChange={handleChange}
                   />
            </div>
            </div>
            <div className='flex mb-6'>
            <div className="w-1/2 mr-2">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="room">
            Room
            </label>
            <input
                     className="shadow appearance-none border rounded w-full py-[0.60rem] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="room"
                     type="text"
                     placeholder="Room"
                     onChange={handleChange}
                   />
            </div>
            <div className="w-1/2 ml-2">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="course">
            Course
            </label>
            <select className= 'border-2 w-full py-2 px-3 rounded text-gray-700' id='course' onChange={handleChange}>
               <option selected disabled hidden>Select Course</option>
                 {courses && courses.map(cs=>(
               <option key={cs._id} value={cs._id}>{cs.title}</option>
                 ))}
            </select>
            </div>
            </div>
            <div className="flex items-center justify-between">
            <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="button"
                     onClick={handleClick} 
                   >
            Create
            </button>
            </div>
            </form>
    </div>
    </div>
  )
}

export default AddExam