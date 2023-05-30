import React, { useState, useContext } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { ApiContext } from '../context/ApiContext';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfirmDialog from './ConfirmDialog';
function Course() {
  const { Api_url } = useContext(ApiContext);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [cls, setCls] = useState('');
  const { data, err, refetch } = useFetch(Api_url + '/users');
  const { data: courseData, err: courseError, refetch: courseRefetch } = useFetch(Api_url + '/course');
  const { data: classData, err: classError, refetch: classRefetch } = useFetch(Api_url + '/class');
  const [showForm, setShowForm] = useState(false);
  let courses = courseData?.data;
  let classes = classData?.data;
  let instructors = data?.data?.filter(user => user.role === 'instructor');
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };
  const handleConfirm = () => {
    if (selectedCourseId) {
      axios
        .delete(`${Api_url}/course/${selectedCourseId}`)
        .then((response) => {
          console.log(response.data);
          // Here you can update the exams list in your state
          courseRefetch();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsConfirmOpen(false);
    setSelectedCourseId(null);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setSelectedCourseId(null);
  };
  const toggleDropdown = (index) => {
  if (dropdownOpen === index) {
    setDropdownOpen(null);
  } else {
    setDropdownOpen(index);
  }
};
const  handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post(Api_url + '/course', {
      title,
      description,
      instructor,
      startTime,
      endTime,
      class: cls
    })
    .then(response => {
      courseRefetch();
      setShowForm(false);
      console.log('Course created:', response.data);
    })
    .catch(error => {
      console.error('Error creating course:', error);
    });
}
const handleDeleteCourse = (id) => {
  setSelectedCourseId(id);
  setDropdownOpen(null);
  setIsConfirmOpen(true);
};
  return (
    <div>
      <div>
      {isConfirmOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this course?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      </div>
      <div>
        <div className='flex justify-between mb-8'>
          <div>
            <h2 className='text-xl'>Course</h2>
            <h4 className='text-slate-600'>Academic</h4>
          </div>
          <button
            onClick={handleCreateButtonClick}
            className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'
          >
            <span className='text-2xl text-gray-300'>+</span> Create
          </button>
        </div>
        <div className='flex flex-wrap gap-4'>
          {courses &&
            courses.map((course, index) => (
              <div key={course._id} className='w-[14rem] h-48 max-w-sm bg-white border border-gray-200 rounded-lg shadow relative dark:bg-gray-800 dark:border-gray-700'>
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
                    onClick={() => handleDeleteCourse(course._id)}
                    className="block px-4 py-2 text-sm w-24 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    type="button"
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
                <div class='flex flex-col items-center '>
                  <h5 class='mb-2 text-2xl font-medium text-gray-900 dark:text-white'>{course.title}</h5>
                  <span class='text-xl text-gray-500 dark:text-gray-400'>{course.instructor.username}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80">
        <div className="bg-white top-8 w-[22rem] lg:left-32 lg:top-6 lg:w-[32rem] md:w-[28rem] rounded-lg relative">
        <div className='bg-gray-50 px-4 py-4 border-b rounded-t-lg border-gray-200 sm:px-6 relative'>
    <h2 className='text-xl font-bold'>Create Course</h2>
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
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='title'>
        Title
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='title'
        type='text'
        value={title}
        placeholder='Title'
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='description'>
        Description
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='description'
        type='text'
        value={description}
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='instructor'>
        Teacher
      </label>
      <select className='border-2 rounded h-10 w-full pl-2' onChange={(e) => setInstructor(e.target.value)}>
        <option selected disabled hidden>
          Select Teacher
        </option>
        {instructors && instructors.map((instructor) => (
          <option key={instructor._id} value={instructor._id}>
            {instructor.username}
          </option>
        ))}
      </select>
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='starttime'>
        Start Time
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='startime'
        type='date'
        value={startTime}
        placeholder='Start Time'
        onChange={(e) => setStartTime(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='endtime'>
        End Time
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='endtime'
        type='date'
        placeholder='End Time'
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='class'>
        Class
      </label>
      <select className='border-2 rounded h-10 w-full pl-2' onChange={(e) => setCls(e.target.value)}>
        <option selected disabled hidden>
          Select Class
        </option>
        {classes && classes.map((cs) => (
          <option key={cs._id} value={cs._id}>
            {cs.name}
          </option>
        ))}
      </select>
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
    </div>
  );
}

export default Course;
