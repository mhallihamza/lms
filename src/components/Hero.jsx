import React from 'react'
import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <div className=" text-center mb-3 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 font-lobster">Mylearn</div>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-gray-900">Built for success</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">All-in-one software to manage the daily management of your school. Best solution for kindergarten, primary, middle school, high school, higher education or private or public training center.</p>
            <Link to="/Login"><button type="button" className="text-white bg-violet-400 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-lg px-7 py-2.5 text-center mr-2 mb-2 block dark:focus:ring-yellow-900 w-[11rem]">Login</button></Link>
            <Link to='/Contact'><button type="button" className="text-white bg-violet-400 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-lg px-7 py-2.5 text-center mr-2 mb-2 w-[11rem] dark:focus:ring-yellow-900">Contact Us</button></Link>
        </div>
        <div className="lg:mt-0 mt-6 lg:col-span-5 lg:flex">
            <img src="./images/logo2.png" alt="mockup"></img>
        </div>                
    </div>
</section>
  )
}