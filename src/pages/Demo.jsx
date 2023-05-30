import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import axios from 'axios';
function Demo() {
    const {Api_url} = useContext(ApiContext);
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        email : undefined,
        password : undefined
     });
     const handleChange =  (e)=>{
        setcredentials((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    };
    const handleClick = e => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
      
        axios.post(Api_url+"/login", credentials)
          .then(res => {
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            navigate("/Accueil")
          })
          .catch(err => {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
          });
      }
    console.log(credentials);
  return (
    <>
    <div>
       <div class="h-screen md:flex bg-gray-50">
	<div
		class="relative overflow-hidden md:flex w-[58%] bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
		<div>
			<h1 class="text-white font-bold text-4xl font-sans">Mylearn</h1>
			<p class="text-white mt-1">My Learn automatise toute la gestion & communication de votre école.</p>
			<button onClick={() => navigate('/Home')} type="submit" class="block w-36 hover:scale-125 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Take Me Home</button>
		</div>
		<div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>
	<section class="bg-gray-50 dark:bg-gray-900 lg:pl-[5.2rem] lg:-mt-12 lg:w-[37%]">
  <div class="flex flex-col items-center mt-12 justify-center py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class=" flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-16 h-16 mr-2" src="/images/brand1.png" alt="logo"></img> 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" value={credentials.email} onChange={handleChange} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required></input>
                  </div>
                  <div>
                      <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" onClick={handleClick} disabled={loading} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  {error && <span>{error.message}</span>}
                  <div className='w-full flex flex-wrap gap-2'>
                     <button type='button' onClick={()=>setcredentials({email:"admin@gmail.com",password:"admin"})} class="w-[48.5%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Admin Login</button>
                     <button type='button' onClick={()=>setcredentials({email:"teacher@gmail.com",password:"teacher"})} class="w-[48.5%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Teacher Login</button>
                     <button type='button'  onClick={()=>setcredentials({email:"student@gmail.com",password:"student"})} class="w-[49%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Student Login</button>    
                  </div>
              </form>
              
          </div>
      </div>
  </div>
</section>
</div>
    </div>
    </>
  )
}

export default Demo