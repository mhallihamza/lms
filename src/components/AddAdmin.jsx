import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function AddAdmin() {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        username:undefined,
        email : undefined,
        password : undefined,
        role : "admin"
     });
     const handleChange =  (e)=>{
        setuser((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
    const handleClick = e => {
        e.preventDefault();
      
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
            <h2 className='text-xl'>Create User</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>USERS</h4>
            </div>
    </div>
    <div className='mt-4 rounded-sm border'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Add User</h1>
            <button onClick={()=>navigate("/Accueil/Admin")} class="flex items-center justify-center mt-2 mr-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span>Back</span>
            </button>
        </div>
        <form class="w-full max-w-lg mx-auto mt-4 mb-4">
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" htmlFor="username">
      Name
    </label>
    <input onChange={handleChange}  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your name"></input>
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="email">
      Email
    </label>
    <input onChange={handleChange} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email"></input>
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="password">
      Password
    </label>
    <input onChange={handleChange} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password"></input>
  </div>
  <div class="flex items-center justify-center">
  <button onClick={handleClick} class="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  <span>Save</span>
  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
</button>
  </div>
</form>

    </div>
    </>
  )
}

export default AddAdmin