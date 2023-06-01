import React, { useState,useContext } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import useFetch from '../hooks/useFetch';
import { MdClose } from 'react-icons/md';
import { ApiContext } from '../context/ApiContext';
import ConfirmDialog from './ConfirmDialog';
function Class() {
  const {Api_url} = useContext(ApiContext);
  const [editName, setEditName] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [showEditClass, setShowEditClass] = useState(false);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };
  const { data, err, refetch } =useFetch(Api_url+"/users");
  const { data: classData, err: classError, refetch: classRefetch } =useFetch(Api_url+"/class");
  const [showForm, setShowForm] = useState(false);
    const handleCreateButtonClick = () => {
      setShowForm(true);
    };
  let classes = classData.data;
  let instructors = data.data?.filter(user=>user.role==="instructor");
  console.log(classes);
  console.log(instructors);
  const handleEditClass = (cls) => {
    setEditName(cls.name);
    setEditStartTime(cls.startTime.split("T")[0]);
    setEditEndTime(cls.endTime.split("T")[0]);
    setSelectedClassId(cls._id);
    setShowEditClass(true);
    setDropdownOpen(null);
  };
  const handleConfirm = () => {
    if (selectedClassId) {
      axios
        .delete(`${Api_url}/class/${selectedClassId}`)
        .then((response) => {
          console.log(response.data);
          // Here you can update the exams list in your state
          classRefetch();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsConfirmOpen(false);
    setSelectedClassId(null);
  };
  const handleCancel = () => {
    setIsConfirmOpen(false);
    setSelectedClassId(null);
  };
  const handleDeleteClass = (id) => {
    setSelectedClassId(id);
    setDropdownOpen(null);
    setIsConfirmOpen(true);
  };
  function handleSubmit(e) {
    e.preventDefault();

    axios.post(Api_url+'/class', {
      name,
      startTime,
      endTime,
    })
    .then(response => {
      console.log('Class created:', response.data);
      classes = classRefetch();
      setShowForm(false)
      // Do something with the response, e.g. redirect to the new class page
    })
    .catch(error => {
      console.error('Error creating class:', error);
      // Do something with the error, e.g. display an error message to the user
    });
  }
  const handleSave = () => {
    // Make a PUT request to update the user's profile with the edited values
    const updatedClass = {
      name: editName,
      startTime: editStartTime,
      endTime : editEndTime
    };
console.log(updatedClass);
    axios
      .put(`${Api_url}/class/${selectedClassId}`, updatedClass)
      .then((response) => {
        console.log(response.data);
        classRefetch();
        // Here you can update the user's profile in your state or refetch the user data
        setShowEditClass(false);
      })
      .catch((error) => {
        console.log(error);
      });
      setSelectedClassId(null);
  };
  const handleClose = () => {
    setShowEditClass(false);
  };
  return (
    <div>
      <div>
      {isConfirmOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this class?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      </div>
    <div>
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
                    onClick={() => handleEditClass(cls)}
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80">
    <div className="bg-white top-8 w-[21rem] lg:left-32 lg:top-8 lg:w-[25rem] md:w-[28rem] rounded-lg relative">
    <div className='bg-gray-50 px-4 py-4 border-b rounded-t-lg border-gray-200 sm:px-6 relative'>
<h2 className='text-xl font-bold'>Create Class</h2>
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
<div className='grid grid-cols-1 gap-4'>
<div className="mb-4">
     <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
       Class Name
     </label>
     <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="name"
       type="text"
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
</div>
<div className='flex mt-3 items-center justify-between'>
  <button
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    type='button'
    onClick={handleSubmit}
  >
    Create
  </button>
</div>
</form>
    </div>
  </div>
 )}
{showEditClass && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80'>
          <div className='bg-white md:w-96 w-[21rem] lg:w-80 p-4 rounded-lg relative lg:left-32'>
            <MdClose
              className='absolute top-2 right-2 text-gray-500 cursor-pointer'
              onClick={handleClose}
            />
            <h2 className='text-2xl font-bold  mb-4'>Edit Class</h2>
            <div className='grid grid-row-3 gap-4 mb-4'>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>Class Name:</label>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>Start Time :</label>
                <input
                  type='date'
                  value={editStartTime}
                  onChange={(e) => setEditStartTime(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>End Time:</label>
                <input
                  type='date'
                  value={editEndTime}
                  onChange={(e) => setEditEndTime(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
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
          </div>
        </div>
      )}
</div>
  );
}
export default Class