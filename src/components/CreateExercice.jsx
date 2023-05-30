import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiTrash2,FiEdit2 } from "react-icons/fi";
import useFetch from '../hooks/useFetch';
import { ApiContext } from '../context/ApiContext';
import axios from 'axios';
function CreateExercice() {
    const {Api_url} = useContext(ApiContext);
    const [selectedExerciceId, setSelectedExerciceId] = useState(null);
    const [showEditExercice, setShowEditExercice] = useState(false);
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
    const {data:courseData,err:courseError,refetch:courseReftech} = useFetch(`${Api_url}/course`)
    var courses = courseData.data;
    var {data,err,refetch} = useFetch(`${Api_url}/exercice`)
    var exercices = data.data;
  } else {
    const {data:courseData,err:courseError,refetch:courseReftech} = useFetch(Api_url+"/course/teacher/"+ user._id)
    var courses = courseData.data;
    var {data,err,refetch} = useFetch(Api_url+"/exercice/teacher/"+ user._id)
    var exercices = data.data;
  }
  console.log(exercices);
  const handleDeleteExercice = (id) => {
    axios
      .delete(`${Api_url}/exercice/${id}`)
      .then((response) => {
        console.log(response.data);
        // Here you can update the exams list in your state
        exercices = refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditExercice = (exercice) => {
    setcreate(exercice);
    setSelectedExerciceId(exercice._id);
    setShowEditExercice(true);
  };
  const handleClick = e => {
    e.preventDefault();
    axios.post(Api_url+"/exercice", create)
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
  const handleSave = () => {
    // Make a PUT request to update the user's profile with the edited values
    const updatedExercice = create;
console.log(updatedExercice);
    axios
      .put(`${Api_url}/exercice/${selectedExerciceId}`, updatedExercice)
      .then((response) => {
        console.log(response.data);
        exercices = refetch();
        // Here you can update the user's profile in your state or refetch the user data
        setShowEditExercice(false);
      })
      .catch((error) => {
        console.log(error);
      });
      selectedExerciceId(null);
  };
  const handleClose = () => {
    setShowEditExercice(false);
  };
  return (
    <div>
         <div>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Exercices List</h2>
            <h4 className='text-slate-600'>Exercices</h4>
            </div>
            <button onClick={handleCreateButtonClick} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div className='border-x-2 shadow-sm rounded-t-md border-t-2 border-solid border-slate-100 mb-0 h-12 flex items-center'>
        <h3 className='ml-4 font-bold'>Exercices</h3>
    </div>
    <div className='border-2 rounded-b-md shadow-sm border-solid mb-6 border-slate-100 py-4 px-4'>
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
              <td class="px-6 flex justify-around py-4 whitespace-nowrap text-right text-sm font-medium">
                   <button onClick={()=>handleDeleteExercice(exercice._id)}>
                   <FiTrash2 className='h-5 w-5 text-red-500'/>
                   </button>
                  <button onClick={() => handleEditExercice(exercice)}>
                   <FiEdit2 className='h-5 w-5 text-green-400'/>
                  </button>
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
         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80">
         <div className="bg-white top-14 w-[22rem] lg:left-32 lg:top-8 lg:w-[32rem] md:w-[28rem] rounded-lg relative">
         <div className='bg-gray-50 px-4 py-4 border-b rounded-t-lg border-gray-200 sm:px-6 relative'>
     <h2 className='text-xl font-bold'>Create Exercice</h2>
     <div className='absolute top-0 right-0 p-2'>
       <button
         className='text-gray-400 hover:text-gray-500 focus:outline-none'
         aria-label='Close'
         onClick={() => setShowForm(false)}
       >
         <svg
           className='h-6 w-6 fill-current'
           xmlns='http://www.w3.org/2000/svg'
           viewBox='0 0 24 24'
         >
           <path
             className='heroicon-ui'
             d='M6.7 5.3a1 1 0 011.4 0L12 10.6l3.9-3.9a1 1 0 111.4 1.4L13.4 12l3.9 3.9a1 1 0 01-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 01-1.4-1.4L10.6 12 6.7 8.1a1 1 0 010-1.4z'
           />
         </svg>
       </button>
     </div>
   </div>
   <form className='bg-white px-8 pt-6 pb-8 mb-4'>
     <div className='grid grid-cols-2 gap-4'>
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
     </div>
     <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
            </label>
            <textarea
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="description"
                     placeholder="Description"
                     rows={3}
                     onChange={handleChange}
                   />
            </div>
     <div className='flex mt-3 items-center justify-between'>
       <button
         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
         type='button'
         onClick={handleClick}
       >
         Create
       </button>
     </div>
   </form>
         </div>
       </div>
      )}
       {showEditExercice && (
         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80">
         <div className="bg-white top-14 w-[22rem] lg:left-32 lg:top-8 lg:w-[32rem] md:w-[28rem] rounded-lg relative">
         <div className='bg-gray-50 px-4 py-4 border-b rounded-t-lg border-gray-200 sm:px-6 relative'>
     <h2 className='text-xl font-bold'>Edit Exercice</h2>
     <div className='absolute top-0 right-0 p-2'>
       <button
         className='text-gray-400 hover:text-gray-500 focus:outline-none'
         aria-label='Close'
         onClick={handleClose}
       >
         <svg
           className='h-6 w-6 fill-current'
           xmlns='http://www.w3.org/2000/svg'
           viewBox='0 0 24 24'
         >
           <path
             className='heroicon-ui'
             d='M6.7 5.3a1 1 0 011.4 0L12 10.6l3.9-3.9a1 1 0 111.4 1.4L13.4 12l3.9 3.9a1 1 0 01-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 01-1.4-1.4L10.6 12 6.7 8.1a1 1 0 010-1.4z'
           />
         </svg>
       </button>
     </div>
   </div>
   <form className='bg-white px-8 pt-6 pb-8 mb-4'>
     <div className='grid grid-cols-2 gap-4'>
     <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={create.name}
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
            value={create.startDate.split("T")[0]}
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
                     value={create.endDate.split("T")[0]}
                     type="date"
                     placeholder="End Date"
                     onChange={handleChange}
                   />
            </div>
     </div>
     <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
            </label>
            <textarea
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="description"
                     value={create.description}
                     placeholder="Description"
                     rows={3}
                     onChange={handleChange}
                   />
            </div>
            <div className='flex justify-center'>
              <button
                onClick={handleSave}
                className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800 mr-2'
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className='bg-gray-300 text-gray-700 w-28 border border-gray-300 rounded text-xl h-9 pb-9 hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
   </form>
         </div>
       </div>
      )}
    </div>
  )
}

export default CreateExercice