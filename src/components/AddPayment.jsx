import { useState,useContext } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ApiContext } from "../context/ApiContext";
import useFetch from "../hooks/useFetch";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
const AddPayment = () => {
  const {Api_url} = useContext(ApiContext);
  const [selectDate, setselectDate] = useState(null);
  const [paymentCreated, setPaymentCreated] = useState(false);
  const [studentExist, setStudentExist] = useState(undefined);
  const [payment, setPayment] = useState({
    student: undefined,
    amount: undefined,
    method: undefined,
    note: undefined,
  });
  const {data,err,refetch} = useFetch(Api_url+"/users")
  let users = data.data;
  console.log(users);
  const generatePDF = (databill) => {
    const doc = new jsPDF();

    // Logo
    doc.addImage('../images/brand.png', 'PNG', 15, 15, 30, 30);

    // School details
    doc.setFontSize(12);
    doc.text('School Name', 55, 25);
    doc.setFontSize(10);
    doc.text('Address: School Address', 55, 32);
    doc.text('Phone: School Phone', 55, 39);

    // Invoice details
    doc.setFontSize(16);
    doc.text('Payment Invoice', 15, 60);
    doc.setFontSize(12);
    doc.text('Invoice Number: '+ databill._id, 15, 70);
    doc.text('Date: '+ databill.createdOn.split("T")[0], 15, 77);
    //doc.text('Due Date: June 5, 2023', 15, 84);

    // Invoice details
    doc.setFontSize(16);
    doc.text('Student details ', 120, 60);
    doc.setFontSize(12);
    doc.text('Student Id: ' + databill.student, 120, 70);
    doc.text('Full Name: ' + databill.username, 120, 77);
    //doc.text('Due Date: June 5, 2023', 15, 84);

    // Table headers
    const headers = ['Item', 'Description', 'Amount'];
    const data = [
      ['Tuition Fee', 'Fall Semester', databill.amount*0.7 + " DHS"],
      ['Books Fee', 'School Supplies', '00.00 DHS'],
      ['Transport Fee', 'Bus Service', databill.amount*0.3 + " DHS"],
    ];

    doc.autoTable({
      startY: 100,
      head: [headers],
      body: data,
    });

    // Total amount
    const total = data.reduce((sum, [, , amount]) => sum + parseFloat(amount.slice(0)), 0);
    doc.setFontSize(12);
    doc.text(`Total: ${total.toFixed(2)} DHS`, 15, doc.autoTable.previous.finalY + 10);

    // Payment method
    doc.setFontSize(12);
    doc.text('Payment Method: ' + databill.method, 15, doc.autoTable.previous.finalY + 20);

    // Payment Signature
    doc.setFontSize(12);
    doc.text('Signature:', 150, doc.autoTable.previous.finalY + 60);

    // Save and open the PDF
    doc.save('payment_bill.pdf');
  };
  const handleChange = (e) => {
    setPayment((prev)=> ({ ...prev, [e.target.id]:e.target.value}))
    console.log(payment);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const student = users.find((user)=>user.username===payment.student);
    if(student) {
      setStudentExist(true);
      axios.post(Api_url+"/payment", {...payment, student: student._id, month:selectDate})
        .then(res => {
          console.log(res);
          setPaymentCreated(true);
          generatePDF({username:student.username,...res.data});
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setStudentExist(false);
    }
  }

  return (
    <div className="flex justify-center h-[50rem] mb-12 items-center lg:h-[50rem] bg-gray-100">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-8">
          Add Payment Details
        </h2>
        {paymentCreated && (
          <div className="bg-green-200 p-4 rounded-lg mb-4 text-green-800">
            Payment created successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="student"
            >
              Student Name
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="text"
              id="student"
              onChange={handleChange}
              required
            />
            {studentExist === false && (
              <div className="text-red-500 mt-2">Student does not exist</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="amount"
            >
              Amount (in DHS)
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="number"
              id="amount"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="year"
            >
              Month
            </label>
            <DatePicker
            selected={selectDate}
            onChange={(date)=>setselectDate(date)}
            placeholderText="Click to select a date"
            showMonthYearPicker
            dateFormat="MM/yyyy"
            className="border text-black text-lg bg-gray-200 rounded-lg w-full py-2 px-3 cursor-pointer"
        />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="method">
            Payment Method
          </label>
          <select
            className="appearance-none border text-lg rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="method"
            onChange={handleChange}
            required
          >
            <option value="">Select a payment method</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="bank transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="note"
            >
              Comments
            </label>
            <textarea className="border rounded-lg py-2 px-3 w-full"

              id="note"
              onChange={handleChange}
              ></textarea>
          </div>
          <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
          </form>
</div>
</div>
)}
 
export default AddPayment