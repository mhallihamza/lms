import { useState } from "react";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleClick = (day) => {
    setSelectedDate(day);
  };

  const renderCalendar = () => {
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const rows = [];
  
    let row = [];
    for (let i = 0; i < firstDay; i++) {
      row.push(<td key={`prev-${i}`} className="text-gray-400"></td>);
    }
  
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isSelected = selectedDate === i;
      if(exams) {
        var examItems = exams
        .filter((exam) => {
          const examDate = new Date(exam.date);
          return (
            examDate.getDate() === i &&
            examDate.getMonth() === currentMonth &&
            examDate.getFullYear() === currentYear
          );
        })
        .map((exam) => {
          return (
            <div key={exam._id} className="text-sm mt-1">
              <span
                className="bg-green-400 text-white rounded-full px-1"
                title={exam.subject}
              >
                {exam.subject}
              </span>
            </div>
          );
        });
    }
      row.push(
        <td
          key={i}
          className={`${
            isSelected ? "bg-green-400 text-white font-medium" : ""
          } text-center cursor-pointer hover:bg-indigo-100 transition-colors duration-200`}
          onClick={() => handleClick(i)}
        >
          {i}
          {examItems}
        </td>
      );
  
      if ((i + firstDay) % 7 === 0 || i === daysInCurrentMonth) {
        rows.push(<tr key={i}>{row}</tr>);
        row = [];
      }
    }
  
    return rows;
  };
  
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const {data: examData, err: examError, refetch: examRefetch} = useFetch("http://localhost:3000/exam/"+ user._id);
  const {data: examDataT, err: examErrorT, refetch: examRefetchT} = useFetch("http://localhost:3000/exam/teacher/"+ user._id);
  let exams = user.role === "student" ? examData.data : examDataT.data;
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <button
          className="text-indigo-500 hover:text-indigo-700 mr-2"
          onClick={() => {
            const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
            }}
            >
            ←
            </button>
            <h2 className="text-lg font-medium text-gray-900">
            {monthsOfYear[currentMonth]} {currentYear}
            </h2>
            <button
            className="text-indigo-500 hover:text-indigo-700 ml-2"
            onClick={() => {
            const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
            }}
            >
            →
            </button>
            </div>
            <table className="table-auto w-full">
            <thead>
            <tr>
            {daysOfWeek.map((day, index) => (
            <th key={index} className="text-gray-500 font-medium">
            {day}
            </th>
            ))}
            </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
            </table>
            </div>
            );
            };
            export default  Calendar