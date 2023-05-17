import React from 'react'
import { useState } from 'react';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { ApiContext } from '../context/ApiContext';
import ConfirmDialog from './ConfirmDialog';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
function CreateExam() {
    const {Api_url} = useContext(ApiContext);
    const navigate = useNavigate();
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const handleConfirm = () => {
      if (selectedExamId) {
        axios
          .delete(`${Api_url}/exam/${selectedExamId}`)
          .then((response) => {
            console.log(response.data);
            // Here you can update the exams list in your state
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setIsConfirmOpen(false);
      setSelectedExamId(null);
    };
  
    const handleCancel = () => {
      setIsConfirmOpen(false);
      setSelectedExamId(null);
    };
    const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };
  const {user,loading,error,dispatch} = useContext(AuthContext)
  if(user.role==="admin"){
    var {data,err,refetch} = useFetch(Api_url+"/exam")
    var exams = data.data;
    } else {
      var {data,err,refetch} = useFetch(Api_url+"/exam/teacher/"+ user._id)
      var exams = data.data;
    }
  console.log(exams);
  const handleDeleteExam = (id) => {
    setSelectedExamId(id);
    setDropdownOpen(null);
    setIsConfirmOpen(true);
  };

  return (
    <div className='relative'>
      <div>
      {isConfirmOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this exam?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      </div>
         <div>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Exams List</h2>
            <h4 className='text-slate-600'>Exam</h4>
            </div>
            <button onClick={()=>navigate("/Accueil/Exam/Add")} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div className="flex flex-wrap gap-4">
      {exams &&
        exams.map((exam, index) => (
          <div
            key={exam._id}
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
                    onClick={() => handleDeleteExam(exam._id)}
                    className="block px-4 py-2 text-sm w-24 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    type="button"
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center ">
              <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                {exam.subject}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(exam.date).toDateString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {exam.room}
              </span>
            </div>
          </div>
        ))}
    </div>
        </div>
    </div>
  )
}

export default CreateExam