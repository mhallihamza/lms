import React, { useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import useFetch from '../hooks/useFetch';
function Class() {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };
  const { data, err, refetch } =useFetch("https://lmsapi-mhallihamza.onrender.com/users");
  const { data: classData, err: classError, refetch: classRefetch } =useFetch("https://lmsapi-mhallihamza.onrender.com/class");
  const [showForm, setShowForm] = useState(false);
    const handleCreateButtonClick = () => {
      setShowForm(true);
    };
  let classes = classData.data;
  let instructors = data.data?.filter(user=>user.role==="instructor");
  console.log(classes);
  console.log(instructors);
  const handleDeleteClass = (id) => {
    axios
      .delete(`https://lmsapi-mhallihamza.onrender.com/class/${id}`)
      .then((response) => {
        console.log(response.data);
        // Here you can update the classes list in your state
        classes = classRefetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleSubmit(e) {
    e.preventDefault();

    axios.post('https://lmsapi-mhallihamza.onrender.com/class', {
      name,
      startTime,
      endTime,
    })
    .then(response => {
      console.log('Class created:', response.data);
      classes = classRefetch();
      // Do something with the response, e.g. redirect to the new class page
    })
    .catch(error => {
      console.error('Error creating class:', error);
      // Do something with the error, e.g. display an error message to the user
    });
  }

  return (
    <div className='relative'>
    <div className={showForm ? 'blur-sm ' : ''}>
   <div className='flex justify-between mb-8'>
       <div>
       <h2 className='text-xl'>Class</h2>
       <h4 className='text-slate-600'>Academic</h4>
       </div>
       <button onClick={handleCreateButtonClick} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
   </div>
   <div className="flex flex-wrap gap-4">
      {classes &&
        classes.map((cls, index) => (
          <div
            key={cls._id}
            className="w-[15rem] relative h-36 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                onClick={() => toggleDropdown(index)}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              </button>
              {dropdownOpen === index && (
                <div
                  id="dropdown"
                  className="z-10 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg top-2 shadow w-24 left-2 dark:bg-gray-700 transition-opacity opacity-100"
                >
                  <button
                    className="block px-4 py-2 text-sm w-24 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    type="button"
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClass(cls._id)}
                    className="block px-4 py-2 text-sm w-24 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    type="button"
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div class="flex flex-col items-center ">
            <h5 class="mb-2 text-2xl font-medium text-gray-900 dark:text-white">{cls.name}</h5>
            <span class="text-l text-center text-gray-500 dark:text-gray-400">{new Date(cls.startTime).toDateString()} to {new Date(cls.endTime).toDateString()}</span>
            </div>
          </div>
        ))}
    </div>
   </div>
   {showForm && (
   <div className="absolute -top-[22rem] lg:-top-16 -left-5 lg:left-64 h-screen flex justify-center items-center bg-white">
      <div className="z-10 inset-0 overflow-y-auto">
<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
<div className="fixed inset-0 transition-opacity">
 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
</div>
<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>;
<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
 <div className="bg-gray-50 px-4 py-3 w-96 lg:w-[45rem] border-b border-gray-200 sm:px-6">
   <h2 className="text-xl font-bold">Create Class</h2>
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
       Class Name
     </label>
     <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="name"
       type="text"
       value={name}
       placeholder="Name"
       onChange={(e)=>setName(e.target.value)}
     />
   </div>
   <div className="mb-4">
     <label
       className="block text-gray-700 font-bold mb-2"
       htmlFor="starttime"
     >
       Start Time
     </label>
     <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="startime"
       type="date"
       value={startTime}
       placeholder="Start Time"
       onChange={(e)=>setStartTime(e.target.value)}
       />
       </div>
       <div className="mb-4">
       <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="endtime"
              >
       End Time
       </label>
       <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="endtime"
                type="date"
                placeholder="End Time"
                onChange={(e)=>setEndTime(e.target.value)}
              />
       </div>
       <div className="flex items-center justify-between">
       <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit} 
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
  );
}
export default Class