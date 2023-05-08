import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
function Exam() {
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const {data,err,refetch} = useFetch("http://localhost:3000/exam/"+ user._id)
    let exams = data.data;
    console.log(exams);
  return (
    <>
    <div>
        <h1 className='text-xl font-semibold'>Exams</h1>
        <h2 className='text-slate-700'>Exams</h2>
    </div>
    <div className='mt-6'>
    <div className='border-x-2 border-t-2 border-solid border-slate-100 mb-0 h-12 flex items-center'>
        <h3 className='ml-4 font-bold'>Exams</h3>
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
                DATE
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SUBJECT
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                START TIME
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                END TIME
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROOM NO
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {exams && exams.map(exam=>(
              <tr key={exam._id}>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {new Date(exam.date).toDateString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {exam.subject}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 {exam.startTime}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {exam.endTime}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {exam.room}
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
    </>
  )
}

export default Exam