import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
function CreateExam() {
    const [showForm, setShowForm] = useState(false);
    const [selectcourse,setSelectcourse] = useState("");
    const handleCreateButtonClick = () => {
      setShowForm(true);
    };
    console.log(showForm);
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
  const {user,loading,error,dispatch} = useContext(AuthContext)
  if(user.role==="admin"){
    var {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/exam")
    var exams = data.data;
    } else {
      var {data:courseData,err:courseError,refetch:courseReftech} = useFetch("https://lmsapi-mhallihamza.onrender.com/course/teacher/"+ user._id)
      var courses = courseData.data;
      var {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/exam/teacher/"+ user._id)
      var exams = data.data;
    }
  console.log(exams);
  const handleClick = e => {
    e.preventDefault();
    console.log(create);
    axios.post("https://lmsapi-mhallihamza.onrender.com/exam", create)
      .then(res => {
        console.log(res)
        axios.get(`https://lmsapi-mhallihamza.onrender.com/course`)
        .then(res => {
          const course = res.data?.filter(course=>course._id===create.course);
          console.log(res);
          axios.get(`https://lmsapi-mhallihamza.onrender.com/class`)
          .then(res => {
            console.log(res);
            const filteredClasses = res.data?.filter(cls => {
              const clsCourses = cls.courses.map(course => course._id);
              return clsCourses.includes(course._id);
            });
            const studentIds = filteredClasses.flatMap(cls => cls.students.map(student => student._id));
            console.log(studentIds);
            axios.post("https://lmsapi-mhallihamza.onrender.com/notification", {
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
      exams = refetch();
  }
  
  
  return (
    <div className='relative'>
         <div className={showForm ? 'blur-sm ' : ''}>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Exams List</h2>
            <h4 className='text-slate-600'>Exam</h4>
            </div>
            <button onClick={handleCreateButtonClick} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div className='flex flex-wrap gap-4'>
        { exams && exams.map((exam) =>(
          <div key={exam._id} class="w-[15rem] h-36 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-end px-4 pt-4">
              <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                  <span class="sr-only">Open dropdown</span>
                  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
              </button>
              <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2" aria-labelledby="dropdownButton">
                  <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                  </li>
                  <li>
                      <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                  </li>
                  </ul>
              </div>
          </div>
          <div class="flex flex-col items-center ">
              <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">{exam.subject}</h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">{new Date(exam.date).toDateString()}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{exam.room}</span>
          </div>
      </div>
        ))}
        </div>
        </div>
        {showForm && (
        <div className="absolute top-9 -left-32 lg:left-36 h-screen flex justify-center items-center bg-white">
           <div className="z-10 inset-0 overflow-y-auto w-[34rem]">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sm:px-6">
        <h2 className="text-xl font-bold">Create Exam</h2>
        <div className="absolute top-0 right-0 p-2">
          <button
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
            onClick={()=>setShowForm(false)}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M6.7 5.3a1 1 0 011.4 0L12 10.6l3.9-3.9a1 1 0 111.4 1.4L13.4 12l3.9 3.9a1 1 0 01-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 01-1.4-1.4L10.6 12 6.7 8.1a1 1 0 010-1.4z"
              />
            </svg>
          </button>
        </div>
      </div>
      <form className="bg-white px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="room">
            Room
            </label>
            <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="room"
                     type="text"
                     placeholder="Room"
                     onChange={handleChange}
                   />
            </div>
            <div className="mb-4">
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
            </div> 

        </div>
      )}
    </div>
  )
}

export default CreateExam