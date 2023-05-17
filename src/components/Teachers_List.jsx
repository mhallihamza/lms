import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import { BiUser } from 'react-icons/bi';
function Teachers_List() {
    const {Api_url}  = useContext(ApiContext) 
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const {data,err,refetch} = useFetch(Api_url+"/class/student/"+ user._id)
    console.log(data.data);
    let teachers = data.data;
  return (
    <div>
        <div className="bg-gray-100">
        <h2 className='font-bold text-xl pl-6 pt-5'>Teachers</h2>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Contact Our Amazing Teachers
          </p>
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teachers && teachers.map(teacher => (
              <li key={teacher._id} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="flex-1 flex flex-col p-8">
                  <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full object-cover" src={teacher.instructor.image ? teacher.instructor.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}  alt="avatar" />
                  <h3 className="mt-6 text-gray-900 text-lg font-medium">{teacher.instructor.username}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Email</dt>
                    <dd className="text-gray-500 text-sm mt-3">{teacher.instructor.email}</dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a href={`mailto:${teacher.email}`} className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                      <BiUser className="mr-2" /> Contact
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Teachers_List