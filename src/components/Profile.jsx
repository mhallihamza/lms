import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import axios from 'axios';
function Profile() {
  const {Api_url} = useContext(ApiContext);
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const [file,setfile]=useState("");
  const [info,setinfo]=useState({});

  const handleChange = (e) =>{
    setinfo((prev)=> ({ ...prev, [e.target.id]:e.target.value}));
  }
  const handleClick = async (e) =>{
     e.preventDefault();
     const data = new FormData();
     data.append("file",file)
     data.append("upload_preset","upload")
     try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/djlbs3tzf/image/upload",data);
        
        const {url} = uploadRes.data;

        const updateUser = {
          ...info,
          image:url,
        };
        const {_id} = user;
        console.log(_id);
        await axios.put(Api_url+'/user/'+_id,updateUser)
        let old=JSON.parse(localStorage.getItem("user")) || null;
old.image=url
localStorage.setItem("user",JSON.stringify(old))

        location.reload()
     }
     catch(err){
      console.log(err)
     }
  }
  return (
    <div class="flex flex-col lg:flex-row lg:flex-wrap h-auto w-full items-center">
      <div class="w-[23rem] lg:w-[20rem]">
        <div class="bg-white shadow-xl rounded-lg mt-3 h-64 lg:h-[17rem] lg:ml-6 lg:-mt-4 lg:mr-5">
          <div class="pt-7">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              src={file ? URL.createObjectURL(file)
              : user.image ? user.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            ></img>
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
              {user.username}
            </h3>
            <div class="text-center text-xl font-semibold">
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white h-80 mt-4 w-[23rem] shadow-xl rounded-lg lg:w-[40rem] lg:mt-0 lg:h-72'>
        <div className='border-b-2 border-solid border-gray-100'>
        <h2 className='my-3  ml-3'>Profile Setting</h2>
        </div>
        <div className='mt-5'>
          <form>
          <div className='ml-3'>
            <label className='mr-9 lg:mr-32'>Name</label>
            <input className='border-2 w-[15.5rem] h-9 rounded-md border-solid border-gray-500 pl-3 lg:w-[27.5rem]' type='text' onChange={handleChange} defaultValue={user.username}></input>
          </div>
          <div className='ml-3 my-5'>
            <label className='mr-10 lg:mr-[8.3rem]'>Email</label>
            <input className='border-2 w-[15.5rem] h-9 rounded-md lg:w-[27.5rem] border-solid border-gray-500 pl-3' type='email'onChange={handleChange} defaultValue={user.email}></input>
          </div>
          <div className='ml-3 mt-7 flex'>
            <label className='mr-9 lg:mr-32'>Image</label>
            <input type="file" id="file" name="img" accept="image/*" onChange={(e)=>setfile(e.target.files[0])}></input>
          </div>
          <button onClick={handleClick} className='bg-blue-600 w-32 h-8 mt-14 text-white ml-3 lg:mt-6'>Update Profile</button>
          </form>
        </div>
      </div>
      <div className='bg-white h-80 mt-4 w-[23rem] shadow-xl rounded-lg mb-4 lg:ml-[20rem] lg:w-[40rem] lg:h-72'>
        <div className='border-b-2 border-solid border-gray-100'>
        <h2 className='my-3  ml-3'>Change Password</h2>
        </div>
        <div className='mt-5'>
          <form>
          <div className='ml-3 flex'>
            <label className='mr-9 w-12 lg:w-36 lg:mr-8'>Current Password</label>
            <input className='border-2 w-[15.5rem] lg:w-[27rem] h-9 rounded-md border-solid border-gray-500 pl-3' type='text' placeholder='Current Password'></input>
          </div>
          <div className='ml-3 my-5 flex'>
            <label className='mr-9 w-12 lg:w-36 lg:mr-8'>New Password</label>
            <input className='border-2 w-[15.5rem] lg:w-[27rem] h-9 rounded-md border-solid border-gray-500 pl-3' type='email'placeholder='New Password'></input>
          </div>
          <button className='bg-blue-600 w-32 h-8 mt-[4.3rem] text-white ml-3 lg:mt-[3.8rem]'>Update Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
