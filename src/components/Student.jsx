import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
import { FiTrash2,FiEdit2 } from "react-icons/fi";
import { BiShow } from "react-icons/bi";
import axios from 'axios';
function Student() {
    const {Api_url}  = useContext(ApiContext) 
    const navigate = useNavigate();
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const {data,err,refetch} = useFetch(Api_url+"/users")
    let users = data.data?.filter(user=>user.role==="student");
    const handleDeleteUser = (id) => {
      axios
        .delete(`${Api_url}/user/${id}`)
        .then((response) => {
          console.log(response.data);
          // Here you can update the exams list in your state
          users = refetch();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    console.log(users);
  return (
    <div>
        <div className='flex justify-between mb-8'>
            <div>
            <h2 className='text-xl'>Student List</h2>
            <h4 className='text-slate-600 text-[0.8rem]'>ADMIN SETTING</h4>
            </div>
            <button onClick={()=>navigate("/Accueil/Student/Add")} className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'><span className='text-2xl text-gray-300'>+</span> Create</button>
        </div>
        <div>
        <div className='flex flex-wrap gap-4'>
  {users && users.map((user) => (
    <div key={user._id} class="w-[15rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex justify-center my-4'>
          <img className='h-[5rem] w-[4.5rem] rounded' src={user.image ? user.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}></img>
        </div>
        <h2 className='text-center'>{user.username}</h2>
        <ul className='flex  mt-4 h-12 border-t-2 items-center'>
           <li className='pt-4 pl-7 w-[5rem] cursor-pointer h-12 border-r-2 hover:bg-red-300'><button onClick={()=>handleDeleteUser(user._id)}><FiTrash2 className='h-5 w-5'/></button></li>
           <li className='pt-4 pl-7 w-[5rem] cursor-pointer h-12 border-r-2 hover:bg-blue-300'><a><BiShow className='h-5 w-5'/></a></li>
           <li className='pt-4  pl-7 h-12 cursor-pointer  w-[5.8rem] hover:bg-green-300'><a><FiEdit2 className='h-5 w-5'/></a></li>
        </ul>
    </div>
  ))}
</div>
        </div>
    </div>
  )
}

export default Student