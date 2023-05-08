import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
function CreateExercice() {
    const [showForm, setShowForm] = useState(false);
    const handleCreateButtonClick = () => {
      setShowForm(true);
    };
    console.log(showForm);
    
    const [create, setcreate] = useState({
        name : undefined,
        description : undefined,
        startDate : undefined,
        endDate : undefined,
        course : undefined,
     });
     const handleChange =  (e)=>{
        setcreate((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
  const {user,loading,error,dispatch} = useContext(AuthContext)
  if(user.role==="admin"){
    const {data:courseData,err:courseError,refetch:courseReftech} = useFetch("https://lmsapi-mhallihamza.onrender.com/course")
    var courses = courseData.data;
    const {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/exercice")
   var exercices = data.data;
  } else {
    const {data:courseData,err:courseError,refetch:courseReftech} = useFetch("https://lmsapi-mhallihamza.onrender.com/course/teacher/"+ user._id)
    var courses = courseData.data;
    var {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/exercice/teacher/"+ user._id)
    var exercices = data.data;
  }
  console.log(exercices);
  const handleClick = e => {
    e.preventDefault();
    axios.post("https://lmsapi-mhallihamza.onrender.com/exercice", create)
      .then(res => {
        console.log(res)
        exercices = refetch();
        console.log(exercices)
       setShowForm(false)
      })
      .catch(err => {
        console.log(err)
      });
      
  }
  
  return (
    <div className='relative'>
         <div className={showForm ? 'blur-sm ' : ''}>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Exercices List</h2>
            <h4 className='text-slate-600'>Exercices</h4>
            </div>
            <button onClick={handleCreateButtonClick} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div className='border-x-2 border-t-2 border-solid border-slate-100 mb-0 h-12 flex items-center'>
        <h3 className='ml-4 font-bold'>Exercices</h3>
    </div>
    <div className='border-2 border-solid border-slate-100 py-4 pl-4'>
    <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {exercices && exercices.map(exercice=>(
              <tr key={exercice._id}>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {exercice.name}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(exercice.startDate).toDateString()} to {new Date(exercice.endDate).toDateString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {exercice.course.title}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
        </div>
        {showForm && (
        <div className="absolute -top-[10rem] lg:top-5 -left-4 lg:left-64 h-screen flex justify-center items-center bg-white">
           <div className="z-10 inset-0 overflow-y-auto ">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-gray-50 px-4 py-3 w-96 lg:w-[45rem] border-b border-gray-200 sm:px-6">
        <h2 className="text-xl font-bold">Create Exercice</h2>
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="course"
          >
            Course
          </label>
          <select className= 'border-2 w-full py-2 px-3 rounded text-gray-700' id='course' onChange={handleChange}>
               <option selected disabled hidden>Select Course</option>
                 {courses && courses.map(cs=>(
               <option key={cs._id} value={cs._id}>{cs.title}</option>
                 ))}
            </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            placeholder="Start Date"
            onChange={handleChange}
            />
            </div>
            <div className="mb-4">
            <label
                     className="block text-gray-700 font-bold mb-2"
                     htmlFor="endDate"
                   >
            End Date
            </label>
            <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="endDate"
                     type="date"
                     placeholder="End Date"
                     onChange={handleChange}
                   />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
            </label>
            <textarea
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="description"
                     placeholder="Description"
                     onChange={handleChange}
                   />
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

export default CreateExercice