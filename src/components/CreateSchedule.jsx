import React,{useState} from 'react'
import Schedule from './Schedule'
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
function CreateSchedule() {
  const navigate = useNavigate();
  const {data,err,refetch} = useFetch("https://lmsapi-mhallihamza.onrender.com/schedule")
  const schedules = data.data;
  console.log(schedules);
  
  return (
    <div>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Class Schedule</h2>
            </div>
            <button onClick={()=>navigate("/Accueil/AddSchedule")} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div>
      <Schedule schedules={schedules}/>
        </div>
    </div>
  )
}

export default CreateSchedule