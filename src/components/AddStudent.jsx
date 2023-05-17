import React from 'react'
import { useState,useContext } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
import { ApiContext } from '../context/ApiContext';
function AddStudent() {
  const Api_url = useContext(ApiContext)
    const navigate = useNavigate();
    const {data,err,refetch} = useFetch(Api_url+"/class");
     let cls = data.data;
    const [user, setuser] = useState({
        username:undefined,
        email : undefined,
        password : undefined,
        parent : undefined,
        admissiondate : undefined,
        class : undefined,
        gender : "male",
        role : "student"
     });
     const handleChange =  (e)=>{
        setuser((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
        console.log(user)
    };
    const handleClick = e => {
        e.preventDefault();
      console.log(user)
        axios.post(Api_url+"/register", user)
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
            <h2 className='text-xl'>Create Student</h2>
            <h4 className='text-slate-500 text-[0.8rem] font-semibold'>STUDENT</h4>
            </div>
    </div>
    <div className='mt-4 rounded-sm border mb-4'>
        <div className='flex justify-between border-b h-14'>
            <h1 className='ml-4 mt-2 font-semibold text-lg'>Create New Student</h1>
            <button onClick={()=>navigate("/Accueil/Student")} class="flex items-center justify-center mt-2 mr-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span>Back</span>
            </button>
        </div>
        <form class="max-w-xl mx-auto p-6">
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
      <label class="block text-gray-700 font-bold mb-2" for="parent">
        Parent
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="parent" type="text" placeholder="Choose a parent"></input>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 mr-2">
      <label class="block text-gray-700 font-bold mb-2" for="class">
        Class
      </label>
      <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"' id='class' onChange={handleChange}>
        <option selected disabled hidden>Select Class</option>
        {cls && cls.map(cs=>(
          <option key={cs._id} value={cs.name}>{cs.name}</option>
        ))}
      </select>
    </div>
    <div class="w-1/2 ml-2">
      <label class="block text-gray-700 font-bold mb-2" for="admissiondate">
       Admission Date
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} id="admissiondate" type="date"></input>
    </div>
  </div>
  <div class="mb-6 flex">
    <div class="w-1/2 ml-2">
    <div className="w-1/2">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <div className='flex'>
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

export default AddStudent