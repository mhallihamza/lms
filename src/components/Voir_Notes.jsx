import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
function Voir_Notes() {
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/note/"+ user._id)
    let notes = data.data;
  return (
    <div>
        <div>
        <h1 className='text-xl font-semibold'>Exams Results</h1>
        <h2 className='text-slate-700'>Exams</h2>
        </div>
        <div className='mt-6'>
    <div className='border-x-2 border-t-2 border-solid border-slate-100 mb-0 h-12 flex items-center'>
        <h3 className='ml-4 font-bold'>Results</h3>
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
                SUBJECT
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NOTE
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                COMMENTS
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {notes && notes.map(note=>(
              <tr key={note._id}>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {note.exam.subject}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {note.note}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 {note.note<10 ? "weak" : note.note==10 ? "passable" : "bien"}
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
    </div>
  )
}

export default Voir_Notes