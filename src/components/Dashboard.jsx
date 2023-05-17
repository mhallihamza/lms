import React from 'react'
import Calendar from './Calendar'
import Schedule from './Schedule'
import Statistique from './Statistique'
import StatistiqueTeacher from './StatistiqueTeacher';
import StatistiqueAdmin from './StatistiqueAdmin';
import useFetch from '../hooks/useFetch';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import { PieChart, Pie, Cell } from "recharts";
function Dashboard() {
  const {Api_url} = useContext(ApiContext)
  const {user,loading,error,dispatch} = useContext(AuthContext)
  console.log(user);
  const {data:dataSchedule,err:errorSchedule,refetch:refecthSchedule} = useFetch(Api_url+"/schedule/student/"+user._id)
  const schedules = dataSchedule.data;
  console.log(schedules);
  const {data: attendanceData,err: attendanceError,refetch: attendanceRefetch} = useFetch(Api_url+"/attendance/"+ user._id);
  const {
    data: studentDataA,
    err: studentErrorA,
    refetch: studentRefetchA,
  } = useFetch(Api_url+'/users')
  const {
    data: studentData,
    err: studentError,
    refetch: studentRefetch,
  } = useFetch(Api_url+'/class/teacher/' + user._id)
  const total = attendanceData.data?.length;
  console.log(attendanceData.data);
  const presentCount  = attendanceData.data?.filter((attendance) =>
  attendance.students.some(
    (student) => student.user._id === user._id && student.status === "Present"
  )
).length;
const absentCount  = attendanceData.data?.filter((attendance) =>
  attendance.students.some(
    (student) => student.user._id === user._id && student.status === "Absent"
  )
).length;
const lateCount  = attendanceData.data?.filter((attendance) =>
  attendance.students.some(
    (student) => student.user._id === user._id && student.status === "Late"
  )
).length;
  console.log(total);
  console.log(presentCount);
const Fcount = user.role === "instructor" ? studentData.data?.map(cls=>cls.students).map(subArr => subArr.filter(obj => obj.gender === 'female').length).reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
) : user.role === "admin" ? studentDataA.data?.filter(user=>user.role === "student").filter(user=>user.gender === "female").length : "";
const Mcount = user.role === "instructor" ? studentData.data?.map(cls=>cls.students).map(subArr => subArr.filter(obj => obj.gender === 'male').length).reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
) : user.role === "admin" ? studentDataA.data?.filter(user=>user.role === "student").filter(user=>user.gender === "male").length : "";
console.log(Fcount);
  const data = user.role === "student" ? [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
    { name: "Late", value: lateCount }
  ] : [
    { name: "Masculun", value: Mcount },
    { name: "Feminun", value: Fcount },
  ];
  const COLORS = user.role === "student" ? ["#00FF00", "#FF0000", "#FFBB28"] : ["#3944BC", "#800080"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
    <h2 className='font-bold text-lg'>Dashboard</h2>
    <div className='mb-6'>
      {user.role === "student" ? <Statistique/> : user.role === "instructor" ? <StatistiqueTeacher/> : <StatistiqueAdmin/>}
    </div>
    <div className={`${user.role==="student" ? '' :'hidden'}`}>
      <div className='lg:flex'>
    <div className='lg:w-[22.5rem] w-full border shadow-lg rounded-lg'>
      <div className='border-b h-12 pl-4 pt-3 text-lg font-medium'>About Me</div>
      <div>
        <img className='h-28 w-28 rounded-full my-4 ml-32' src={user.image ? user.image : "https://karismedicalgroup.com.au/wp-content/uploads/2019/11/default-male.jpg"}></img>
        <div className='ml-7'>
        <div className='ml-5 mb-1 text-md font-semibold'>Name <span className='pl-[5.4rem] text-base font-normal'>{user.username}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        <div className='ml-5 mb-1 text-md font-semibold'>Email <span className='pl-[5rem] text-base font-normal'>{user.email}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        <div className='ml-5 mb-1 text-md font-semibold'>Class <span className='pl-[8rem] text-base font-normal'>{user.class}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        <div className='ml-5 mb-1 text-md font-semibold'>Parent <span className='pl-[7rem] text-base font-normal'>{user.parent}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        <div className='ml-5 mb-1 text-md font-semibold'>Admitted <span className='pl-[4rem] text-base font-normal'>{new Date(user.admissiondate).toDateString()}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        <div className='ml-5 mb-1 text-md font-semibold'>Gender <span className='pl-[7.1rem] text-base font-normal'>{user.gender}</span></div>
        <div class="border-b border-gray-300 mb-4 w-[20rem]"></div>
        </div>
      </div>
    </div>
    <div className='lg:w-[23rem] w-full  bg-white border shadow-lg rounded-lg lg:ml-7 relative mt-5  lg:mt-0'>
      <div className='border-b h-12 pl-4 pt-3 text-lg font-medium'>Attendance</div>
      <div className='absolute left-[17rem] bottom-80'>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#00FF00] mt-1 '></div>
        <div className='ml-4'>Present</div>
        </div>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#FF0000] mt-1 '></div>
        <div className='ml-4'>Absent</div>
        </div>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#FFBB28] mt-1 '></div>
        <div className='ml-4'>Late</div>
        </div>
      </div>
    <PieChart width={380} height={400} className='mt-8'>
      <Pie
      className='h-96 w-96'
        data={data}
        cx={130}
        cy={150}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div  className='flex border absolute bottom-12 ml-10'>
      <div className='border-r px-2 w-24 bg-green-400'>Present - <span>{presentCount}</span></div>
      <div className='border-r w-24 pl-2 pr-2 bg-red-400'>Absent - <span>{absentCount}</span></div>
      <div className='w-24 bg-yellow-200 pl-4'>Late - <span></span>{lateCount}</div>
    </div>
    </div>
    </div>
    </div>
    <div className={`lg:w-[23rem] border relative shadow-lg rounded-lg lg:ml-7 ${user.role==="instructor" ? '' :'hidden'}`}>
      <div className='border-b h-12 pl-4 pt-3 text-lg font-medium'>Students</div>
      <div className='absolute left-[15rem] bottom-[22rem]'>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#3944BC] mt-1 '></div>
        <div className='ml-4'>Masculun</div>
        </div>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#800080] mt-1 '></div>
        <div className='ml-4'>Femunun</div>
        </div>
      </div>
    <PieChart width={400} height={400} className='mt-8'>
      <Pie
      className='h-96 w-96'
        data={data}
        cx={130}
        cy={150}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div className='flex border absolute bottom-12 ml-9'>
      <div className='border-r px-2 w-36 bg-blue-400'>Masculun - <span>{Mcount}</span></div>
      <div className='border-r w-36 pl-2 pr-2 bg-purple-400'>Femunun - <span>{Fcount}</span></div>
    </div>
    </div>
    <div className={`lg:w-[23rem] border relative shadow-lg rounded-lg lg:ml-7 ${user.role==="admin" ? '' :'hidden'}`}>
      <div className='border-b h-12 pl-4 pt-3 text-lg font-medium'>Students</div>
      <div className='absolute left-[14.5rem] bottom-[22rem]'>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#3944BC] mt-1 '></div>
        <div className='ml-4'>Masculun</div>
        </div>
        <div className='flex'>
        <div className='rounded-full h-4 w-4 bg-[#800080] mt-1 '></div>
        <div className='ml-4'>Femunun</div>
        </div>
      </div>
    <PieChart width={380} height={380} className='mt-8'>
      <Pie
      className='h-96 w-96'
        data={data}
        cx={130}
        cy={150}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div className='flex border absolute bottom-12 ml-9'>
      <div className='border-r px-2 w-36 bg-blue-400'>Masculun - <span>{Mcount}</span></div>
      <div className='border-r w-36 pl-2 pr-2 bg-purple-400'>Femunun - <span>{Fcount}</span></div>
    </div>
    </div>
    <div>
        { user.role === "student" ?
        <>
          <h1 className='font-bold text-lg mt-4'>Calendar</h1>
          <Schedule schedules={schedules}/>
        </>
          : ""
        }
    </div>
    <div className='mb-6'>
        { user.role === "student" ?
          <h1 className='font-bold text-lg mt-4'>Calendar Des Examins</h1>
        : user.role === "instructor" ? <h1 className='font-bold text-lg mt-4'>Routine Des Examins</h1> : ""}
        { user.role === "admin" ? "" : <Calendar/>}
    </div>
    </>
  )
}

export default Dashboard