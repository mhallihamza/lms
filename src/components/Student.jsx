import React, { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { BiShow } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
function Student() {
  const { Api_url } = useContext(ApiContext);
  const navigate = useNavigate();
  const { data, err, refetch } = useFetch(Api_url + '/users');
  let users = data.data?.filter((user) => user.role === 'student');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editParent, setEditParent] = useState('');
  const [editClass, setEditClass] = useState(undefined);
  const [editGender, setEditGender] = useState('');
  const [editAdmissiondate, setEditAdmissiondate] = useState('');
  const {data: clsData,err: clsError,refetch:clsRefetch} = useFetch(Api_url+"/class");
     let cls = clsData.data;
  const handleConfirm = () => {
      if (selectedExamId) {
        axios
          .delete(`${Api_url}/user/${selectedExamId}`)
          .then((response) => {
            console.log(response.data);
            // Here you can update the exams list in your state
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setIsConfirmOpen(false);
      setSelectedExamId(null);
    };
  const handleCancel = () => {
    setIsConfirmOpen(false);
    setSelectedExamId(null);
  };

  const handleDeleteExam = (id) => {
    setSelectedExamId(id);
    setIsConfirmOpen(true);
  };

  const handleShowProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const handleEditProfile = (user) => {
    setSelectedUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditParent(user.parent);
    setEditGender(user.gender);
    setEditAdmissiondate(user.admissiondate.split("T")[0]);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = () => {
    // Make a PUT request to update the user's profile with the edited values
    const updatedUser = {
      ...selectedUser,
      username: editUsername,
      email: editEmail,
      parent: editParent,
      class: editClass,
      admissiondate: editAdmissiondate,
      gender: editGender,
      password : editPassword
    };
console.log(updatedUser);
    axios
      .put(`${Api_url}/user/${selectedUser._id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        // Here you can update the user's profile in your state or refetch the user data
        setShowEditProfileModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
    setShowEditProfileModal(false);
  };

  return (
    <div>
      <div>
      {isConfirmOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this exam?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      </div>
      <div className='flex justify-between mb-8'>
        <div>
          <h2 className='text-xl'>Student List</h2>
          <h4 className='text-slate-600 text-[0.8rem]'>ADMIN SETTING</h4>
        </div>
        <button
          onClick={() => navigate('/Accueil/Student/Add')}
          className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800'
        >
          <span className='text-2xl text-gray-300'>+</span> Create
        </button>
      </div>
      <div>
        <div className='flex flex-wrap gap-4'>
          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className='w-[15rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
              >
                <div className='flex justify-center my-4'>
                  <img
                    className='h-[5rem] w-[4.5rem] rounded'
                    src={
                      user.image ||
                      'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    }
                    alt='User Profile'
                  ></img>
                </div>
                <h2 className='text-center'>{user.username}</h2>
                <ul className='flex  mt-4 h-12 border-t-2 items-center'>
                  <li className='pt-4 pl-7 w-[5rem] cursor-pointer h-12 border-r-2 hover:bg-red-300'>
                    <button onClick={() => handleDeleteExam(user._id)}>
                      <FiTrash2 className='h-5 w-5' />
                    </button>
                  </li>
                  <li className='pt-4 pl-7 w-[5rem] cursor-pointer h-12 border-r-2 hover:bg-blue-300'>
                    <a onClick={() => handleShowProfile(user)}>
                      <BiShow className='h-5 w-5' />
                    </a>
                  </li>
                  <li className='pt-4  pl-7 h-12 cursor-pointer w-[5.8rem] hover:bg-green-300'>
                    <a onClick={() => handleEditProfile(user)}>
                      <FiEdit2 className='h-5 w-5' />
                    </a>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
      {showProfileModal && !showEditProfileModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80'>
          <div className='bg-white w-auto lg:w-96 top-[3.7rem] lg:top-8 p-4 rounded-lg relative lg:left-32'>
            <MdClose
              className='absolute top-2 right-2 text-gray-500 cursor-pointer'
              onClick={handleCloseProfile}
            />
            <h2 className='text-2xl font-bold mb-4'>Profile</h2>
            <div className='flex items-center justify-center mb-4'>
              <img
                className='h-32 w-32 rounded-full object-cover'
                src={
                  selectedUser.image ||
                  'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt='User Profile'
              />
            </div>
            <div className='grid grid-row-3 gap-4 mb-4'>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Username:</p>
                <p className='text-lg ml-28'>{selectedUser.username}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Email:</p>
                <p className='text-lg ml-32'>{selectedUser.email}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Class:</p>
                <p className='text-lg ml-48'>{selectedUser.class.name}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Gender:</p>
                <p className='text-lg ml-44'>{selectedUser.gender}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Parent:</p>
                <p className='text-lg ml-44'>{selectedUser.parent}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2'>Date of Admission:</p>
                <p className='text-lg ml-16'>
                  {new Date(selectedUser.admissiondate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80">
        <div className="bg-white top-8 w-[22rem] lg:left-32 lg:top-6 lg:w-[28rem] md:w-[28rem] p-6 rounded-lg relative">
          <div className="absolute top-2 right-2">
            <MdClose
              className="text-gray-500 cursor-pointer"
              onClick={handleCloseProfile}
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-lg font-semibold mb-2">
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="text-lg pl-3 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg font-semibold mb-2">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="text-lg pl-3 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="parent" className="text-lg font-semibold mb-2">
                  Parent:
                </label>
                <input
                  id="parent"
                  type="text"
                  value={editParent}
                  onChange={(e) => setEditParent(e.target.value)}
                  className="text-lg pl-3 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="class" className="text-lg font-semibold mb-2">
                  Class:
                </label>
                <select
                  id="class"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setEditClass(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select Class
                  </option>
                  {cls &&
                    cls.map((cs) => (
                      <option key={cs._id} value={cs._id}>
                        {cs.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg font-semibold mb-2">
                  New Password:
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="text-lg pl-3 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="admissiondate" className="text-lg font-semibold mb-2">
                Admission Date
                </label>
                <input
                  id="admissiondate"
                  type="date"
                  value={editAdmissiondate}
                  onChange={(e) => setEditAdmissiondate(e.target.value)}
                  className="text-lg pl-3 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <div className='flex'>
        <div className="inline-flex items-center mt-2">
          <input
            className="form-radio h-5 w-5 text-gray-600"
            type="radio"
            name="gender"
            value="male"
            id='gender'
            checked={editGender === 'male'}
            onChange={(e) => setEditGender(e.target.value)}
          />
          <span className="ml-2 text-gray-700">Male</span>
        </div>
        <div className="inline-flex items-center lg:ml-6 ml-4 mt-2">
          <input
            className="form-radio h-5 w-5 text-gray-600"
            type="radio"
            name="gender"
            value="female"
            id='gender'
            checked={editGender === 'female'}
            onChange={(e) => setEditGender(e.target.value)}
          />
          <span className="ml-2 text-gray-700">Female</span>
        </div>
        </div>
      </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSaveProfile}
                className="bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCloseProfile}
                className="bg-gray-300 text-gray-700 w-28 border border-gray-300 rounded text-xl h-9 pb-9 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Student;
