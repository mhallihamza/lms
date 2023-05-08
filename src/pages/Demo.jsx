import React from 'react'
import Login from './Login'
function Demo() {
  return (
    <>
    <Login/>
    <div className='absolute bottom-[33%] lg:left-[64%] bg-white-400 lg:w-[26.3rem] lg:-bottom-1 rounded-md h-32 bg-white shadow-xl'>
    <table className='ml-5 mt-3 bg-white'>
    <thead className='border-[2px] border-solid border-gray-200 bg-gray-50 text-[12px] text-gray-600'>
        <tr>
            <th>EMAIL</th>
            <th>PASSWORD</th>
            <th>ROLE</th>
            <th></th>
        </tr>
    </thead>
    <tbody className='border-x-[2px] border-solid border-gray-200 '>
        <tr  className='border-b-[2px] border-solid border-gray-200 '>
            <td>admin@gmail.com</td>
            <td>password</td>
            <td>Admin</td>
            <td>button</td>
        </tr>
        <tr className='border-b-[2px] border-solid border-gray-200 '>
            <td>student@gmail.com</td>
            <td>password</td>
            <td>Student</td>
            <td>button</td>
        </tr>
        <tr className='border-b-[2px] border-solid border-gray-200 '>
            <td>teacher@gmail.com</td>
            <td>password</td>
            <td>Teacher</td>
            <td>button</td>
        </tr>
    </tbody>
</table>
    </div>
    </>
  )
}

export default Demo