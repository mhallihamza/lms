import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch'
import { BsPencilSquare, BsFillStopwatchFill } from 'react-icons/bs'
function StatistiqueTeacher() {
  const {Api_url}  = useContext(ApiContext) 
  const { user, loading, error, dispatch } = useContext(AuthContext)
  const {
    data: examData,
    err: examError,
    refetch: examRefetch,
  } = useFetch(Api_url+'/exam/teacher/' + user._id)
  const {
    data: exerciceData,
    err: exerciceError,
    refetch: exerciceRefetch,
  } = useFetch(Api_url+'/exercice/teacher/' + user._id)
  const {
    data: studentData,
    err: studentError,
    refetch: studentRefetch,
  } = useFetch(Api_url+'/class/teacher/' + user._id)
  let exams = examData.data?.length
  let exercices = exerciceData.data?.length
  let students = studentData.data?.map((cls) => cls.students.length)
  let studentsCount = students?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  let attendance = studentData.data?.length
  return (
    <div>
      <div class="mt-4">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                <svg
                  class="h-8 w-8 text-white"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="mx-5">
                <h4 class="text-2xl font-semibold text-gray-700">
                  {studentsCount}
                </h4>
                <div class="text-gray-500">Students</div>
              </div>
            </div>
          </div>

          <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
                <BsPencilSquare className="text-white text-3xl" />
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
                <BsFillStopwatchFill className="text-white text-3xl" />
              </div>

              <div class="mx-5">
                <h4 class="text-2xl font-semibold text-gray-700">
                  {exercices}
                </h4>
                <div class="text-gray-500">Exercices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatistiqueTeacher
