import React from 'react'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { useNavigate, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
function UpdateExam() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {Api_url} = useContext(ApiContext);
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const {data:examData,err:examError,refetch:examReftech} = useFetch(`${Api_url}/exam`)
    const exam = examData.data?.filter((exam)=>exam._id===id);
    console.log(exam);
    const [update, setupdate] = useState({
        date : "",
        subject : "",
        startTime : "",
        endTime : "",
        room : "",
        course : "",
     });
     useEffect(()=>{
      if(exam){
        setupdate({
        date : exam[0].date.split("T")[0],
        subject : exam[0].subject,
        startTime : exam[0].startTime,
        endTime : exam[0].endTime,
        room : exam[0].room,
        course : exam[0].course,
        })
      }
  },[examData]);
     const handleChange =  (e)=>{
        setupdate((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
    if(user.role==="admin"){
        var {data:courseData,err:courseError,refetch:courseReftech} = useFetch(Api_url+"/course")
        var courses = courseData.data;
        } else {
          var {data:courseData,err:courseError,refetch:courseReftech} = useFetch(Api_url+"/course/teacher/"+ user._id)
          var courses = courseData.data;
        }
        const handleSave = () => {
            // Make a PUT request to update the user's profile with the edited values
        console.log(update);
            axios
              .put(`${Api_url}/exam/${id}`, update)
              .then((response) => {
                console.log(response.data);
                // Here you can update the user's profile in your state or refetch the user data
              })
              .catch((error) => {
                console.log(error);
              });
          };    
  return (
    <div>
         <div>
         <div>
            <h2 className='text-xl'>Edit Exam</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>EXAM</h4>
            </div>
    </div>
    <div className='mt-4 rounded-lg shadow-sm border mb-4'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Edit Exam</h1>
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
            value={update.date}
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
            value={update.subject}
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
            value={update.startTime}
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
                     value={update.endTime}
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
                     value={update.room}
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
                     onClick={handleSave} 
                   >
            Update
            </button>
            </div>
            </form>
    </div>
    </div>
  )
}

export default UpdateExam