import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function AddTeacher() {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        username:undefined,
        email : undefined,
        password : undefined,
        phone : undefined,
        joiningdate : undefined,
        gender : "male",
        role : "instructor"
     });
     const handleChange =  (e)=>{
        setuser((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
    const handleClick = e => {
        e.preventDefault();
      console.log(user)
        axios.post("http://localhost:3000/register", user)
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
            <h2 className='text-xl'>Create Teacher</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>TEACHER</h4>
            </div>
    </div>
    <div className='mt-4 rounded-sm border mb-4'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Create New Teacher</h1>
            <button onClick={()=>navigate("/Accueil/Teacher")} class="flex items-center justify-center mt-2 mr-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span>Back</span>
            </button>
        </div>
        <form class="max-w-7xl mx-auto p-6">
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" for="username">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="username" type="text" placeholder="Enter your name"></input>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="email" type="email" placeholder="Enter your email"></input>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="password" type="password" placeholder="Enter your password"></input>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="phone">
        Phone
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="phone" type="text" placeholder="Enter your phone number"></input>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" for="joiningdate">
        Joining Date
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="joiningdate" type="date"></input>
    </div>
    <div class="w-1/2 ml-2">
    <div className="w-1/2">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <div className="inline-flex items-center mt-2">
          <input
            className="form-radio h-5 w-5 text-gray-600"
            type="radio"
            name="gender"
            value="male"
            id='gender'
            checked={user.gender === 'male'}
            onChange={handleChange}
          />
          <span className="ml-2 text-gray-700">Male</span>
        </div>
        <div className="inline-flex items-center lg:ml-6 mt-2">
          <input
            className="form-radio h-5 w-5 text-gray-600"
            type="radio"
            name="gender"
            value="female"
            id='gender'
            checked={user.gender === 'female'}
            onChange={handleChange}
          />
          <span className="ml-2 text-gray-700">Female</span>
        </div>
      </div>
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

export default AddTeacher