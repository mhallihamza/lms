import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';

function Exercice() {
  const { Api_url } = useContext(ApiContext);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const { data, err, refetch } = useFetch(Api_url + '/exercice/' + user._id);
  let exercices = data.data;
  console.log(exercices);

  return (
    <>
      <div>
        <h1 className='text-xl font-semibold'>Exercices</h1>
        <h2 className='text-slate-700'>Exercices</h2>
      </div>
      <div className='mt-6 bg-white'>
        <div className='border-x-2 border-t-2 rounded-t-md border-solid border-slate-100 mb-0 h-12 flex items-center'>
          <h3 className='ml-4 font-bold'>Exercices</h3>
        </div>
        <div className='border-2 mb-6 rounded-b-md border-solid border-slate-100 py-4 px-4'>
          <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          First Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          End Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Description
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Teacher
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {exercices &&
                        exercices.map((exercice) => (
                          <tr key={exercice._id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              {new Date(exercice.startDate).toDateString()}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              {new Date(exercice.endDate).toDateString()}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                              {exercice.name}
                            </td>
                            <td className='px-6 py-4 whitespace-wrap text-sm text-gray-500'>
                              {exercice.description}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                              {exercice.course.instructor.username}
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
  );
}

export default Exercice;
