import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
const Attendance = () => {
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const {data,err,refetch} = useFetch("http://localhost:3000/attendance/"+ user._id);
  let attendances = data.data;
  const [filterStatus, setFilterStatus] = useState("");
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredAttendanceData = filterStatus
    ? attendances.filter((attendance) =>
        attendance.students.some(
          (student) => student.user._id === user._id && student.status === filterStatus
        )
      )
    : attendances;

  return (
    <div className="bg-white rounded-lg shadow-lg px-4 py-4 sm:p-6">
      <h2 className="text-lg font-medium text-gray-900">Attendance</h2>
      <div className="mt-4">
        <div className="flex items-center mb-4">
          <span className="mr-2">Filter:</span>
          <button
            onClick={() => handleFilter("")}
            className={`${
              filterStatus === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            } py-1 px-2 rounded-md`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("Present")}
            className={`${
              filterStatus === "Present" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            } ml-2 py-1 px-2 rounded-md`}
          >
            Present
          </button>
          <button
            onClick={() => handleFilter("Absent")}
            className={`${
              filterStatus === "Absent" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
            } ml-2 py-1 px-2 rounded-md`}
          >
            Absent
          </button>
          <button
            onClick={() => handleFilter("Late")}
            className={`${
              filterStatus === "Late" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            } ml-2 py-1 px-2 rounded-md`}
          >
            Late
          </button>
        </div>
        {attendances && filteredAttendanceData.map((attendance) => (
          <div key={attendance._id} className="mb-4">
            <p className="text-gray-700 font-medium mb-2">
              Class: {attendance.class}
            </p>
            <p className="text-gray-500 mb-2">
              Date: {new Date(attendance.date).toDateString()}
            </p>
            {attendance.students.some(
              (student) => student.user._id === user._id
            ) ? (
              <p className="text-gray-700 font-medium mb-2">
                Status:{" "}
                {
                  attendance.students.find(
                    (student) => student.user._id === user._id
                  ).status
                }
              </p>
            ) : (
              <p className="text-gray-700 font-medium mb-2">Not marked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
