import { useState } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
function AddSchedule() {
    const navigate = useNavigate();
    const weekdays = [
        { name: 'Sunday', number: 0 },
        { name: 'Monday', number: 1 },
        { name: 'Tuesday', number: 2 },
        { name: 'Wednesday', number: 3 },
        { name: 'Thursday', number: 4 },
        { name: 'Friday', number: 5 },
        { name: 'Saturday', number: 6 }
      ];
          
    const {data:classData,err:classError,refetch:classReftech} = useFetch("http://localhost:3000/class");
    let cls = classData.data;
    const {data:courseData,err:courseError,refetch:courseReftech} = useFetch("http://localhost:3000/course");
    let courses = courseData.data;
    const [user, setuser] = useState({
        class:undefined,
        course : undefined,
        weekday : undefined,
        subject : undefined,
        startTime : undefined,
        endTime : undefined,
        room : undefined,
     });
     const handleChange =  (e)=>{
        setuser((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
        console.log(user)
    };
    const handleClick = e => {
        e.preventDefault();
      console.log(user)
        axios.post("http://localhost:3000/schedule", user)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
  return (
    <>
    <div>
         <div>
            <h2 className='text-xl'>Create Schedule</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>Schedule</h4>
            </div>
    </div>
    <div className='mt-4 rounded-sm border mb-4'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Create New Schedule</h1>
            <button onClick={()=>navigate("/Accueil/Schedule")} class="flex items-center justify-center mt-2 mr-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span>Back</span>
            </button>
        </div>
        <form class="max-w-xl mx-auto p-6">
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" htmlFor="class">
        Class
      </label>
      <select className= 'border-2 w-full py-2 px-3 rounded text-gray-700' id='class' onChange={handleChange}>
               <option selected disabled hidden>Select Class</option>
                 {cls && cls.map(cs=>(
               <option key={cs._id} value={cs._id}>{cs.name}</option>
                 ))}
            </select>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" htmlFor="course">
        Course
      </label>
      <select className= 'border-2 w-full py-2 px-3 rounded text-gray-700' id='course' onChange={handleChange}>
               <option selected disabled hidden>Select Course</option>
                 {courses && courses.map(cs=>(
               <option key={cs._id} value={cs._id}>{cs.title}</option>
                 ))}
     </select>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" htmlFor="weekday">
        Weekday
      </label>
      <select className= 'border-2 w-full py-2 px-3 rounded text-gray-700' id='weekday' onChange={handleChange}>
               <option selected disabled hidden>Select Weekday</option>
                 {weekdays && weekdays.map(weekday=>(
               <option key={weekday.number} value={weekday.number}>{weekday.name}</option>
                 ))}
     </select>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" htmlFor="subject">
        Subject
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="subject" type="text" placeholder="Choose a subject"></input>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="startTime">
       Start time
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="startTime" type="time"></input>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="endTime">
       End time
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="endTime" type="time"></input>
    </div>
  </div>
  <div class="mb-6 flex">
  <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="room">
       Room
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="room" type="text" placeholder="Choose a room"></input>
    </div>
  </div>
    <div class="mt-8 text-center">
    <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      Save
    </button>
  </div>
</form>
    </div>
    </>
  )
}

export default AddSchedule