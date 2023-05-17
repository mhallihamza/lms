import { FaUserCheck, FaClipboardList, FaFileAlt } from 'react-icons/fa';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import { FaDivide } from "react-icons/fa";
import { BsPencilSquare, BsFillStopwatchFill } from "react-icons/bs";
const Statistique = () => {
  const {Api_url}  = useContext(ApiContext) 
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const {data: examData, err: examError, refetch: examRefetch} = useFetch(Api_url+"/exam/"+ user._id)
  const {data: exerciceData,err: exerciceError,refetch: exerciceRefetch} = useFetch(Api_url+"/exercice/"+ user._id)
  const {data: attendanceData,err: attendanceError,refetch: attendanceRefetch} = useFetch(Api_url+"/attendance/"+ user._id);
  let exams = examData.data?.length ;
  let exercices = exerciceData.data?.length;
  let attendance = attendanceData.data?.length;
  return (
    <div class="mt-4">
        <div class="flex flex-wrap -mx-4">
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <FaDivide className='text-white text-3xl'/>
                    </div>

                    <div class="mx-5">
                        <h4 class="text-2xl font-semibold text-gray-700">{attendance}</h4>
                        <div class="text-gray-500">Attendance</div>
                    </div>
                </div>
            </div>

            <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
                        <BsPencilSquare className='text-white text-3xl'/>
                    </div>

                    <div class="mx-5">
                        <h4 class="text-2xl font-semibold text-gray-700">{exams}</h4>
                        <div class="text-gray-500">Exams</div>
                    </div>
                </div>
            </div>

            <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
                        <BsFillStopwatchFill className='text-white text-3xl'/>
                    </div>

                    <div class="mx-5">
                        <h4 class="text-2xl font-semibold text-gray-700">{exercices}</h4>
                        <div class="text-gray-500">Exercices</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Statistique
