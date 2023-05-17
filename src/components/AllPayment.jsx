import { useState, useEffect, useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router'
const AllPayment = () => {
  const { Api_url } = useContext(ApiContext)
  const navigate = useNavigate()
  const { data, err, refetch } = useFetch(Api_url + '/payment')
  const [searchTerm, setSearchTerm] = useState('')
  const payments = data.data?.filter((payment) =>
    payment.student.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">Payments List</h1>
            <h2 className="text-slate-700">Payments</h2>
          </div>
          <button
            onClick={() => navigate('/Accueil/AddPayment')}
            className="bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800"
          >
            <span className="text-2xl text-gray-300">+</span> Create
          </button>
        </div>
      </div>
      <div class="block m-2 mt-4 w-56">
                    <label for="search" class="sr-only">
                      Search
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                        <svg
                          class="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        class="py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Search"
                      ></input>
                    </div>
                  </div>
      <div className="mt-6 bg-white">
        <div className="border-x-2 rounded-t-lg border-t-2 border-solid border-slate-100 mb-0 h-12 flex items-center">
          <h3 className="ml-4 font-bold">Payments List</h3>
        </div>
        <div className="border-2 rounded-b-lg mb-6 border-solid border-slate-100 py-4 px-4">
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Student
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Month
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount en (DHS)
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Method
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {payments &&
                        payments.map((payment) => (
                          <tr key={payment._id}>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.student.username}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(payment.createdOn).toDateString()}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.month}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.amount}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-green-500">
                              {payment.method}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllPayment
