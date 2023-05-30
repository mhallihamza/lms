import React from 'react'
import { useState, useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
function StudentPayments() {
    const { Api_url } = useContext(ApiContext);
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const { data, err, refetch } = useFetch(Api_url + '/payment/student/' + user._id)
    const payments = data.data;
    console.log(payments);
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 7;
    const totalPages = Math.ceil(payments?.length / paymentsPerPage);
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments?.slice(indexOfFirstPayment, indexOfLastPayment);
  return (
    <div>
        <div>
          <div>
            <h1 className="text-xl font-semibold">Payments List</h1>
            <h2 className="text-slate-700">Payments</h2>
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
                        currentPayments.map((payment) => (
                          <tr key={payment._id}>
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
        <div className="flex justify-center">
        <div className="mt-4">
          <nav className="flex items-center justify-between">
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="px-4 py-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`mx-1 px-2 py-1 rounded ${
                      pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
      </div>
    </div>
  )
}

export default StudentPayments