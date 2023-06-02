import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ApiContext } from '../context/ApiContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { BiShow } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
function Admin() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const { Api_url } = useContext(ApiContext);
  const navigate = useNavigate();
  const { data, err, refetch } = useFetch(Api_url + '/users');
  let users = data.data?.filter((user) => user.role === 'admin');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
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
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = () => {
    // Make a PUT request to update the user's profile with the edited values
    const updatedUser = {
      ...selectedUser,
      username: editUsername,
      email: editEmail,
      password : editPassword
    };
console.log(updatedUser);
    axios
      .put(`${Api_url}/user/${selectedUser._id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        // Here you can update the user's profile in your state or refetch the user data
        refetch();
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
          <h2 className='text-xl'>User List</h2>
          <h4 className='text-slate-600 text-[0.8rem]'>ADMIN SETTING</h4>
        </div>
        <button
          onClick={() => navigate('/Accueil/Admin/Add')}
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
          <div className='bg-white w-auto lg:w-96 p-4 rounded-lg relative lg:left-32'>
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
                <p className='text-lg font-semibold mb-2 flex-grow'>Username:</p>
                <p className='text-lg ml-4 text-right'>{selectedUser.username}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2 flex-grow'>Email:</p>
                <p className='text-lg ml-4 text-right'>{selectedUser.email}</p>
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold mb-2 flex-grow'>Date of Registration:</p>
                <p className='text-lg ml-4 text-right'>
                  {new Date(selectedUser.createdOn).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditProfileModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80'>
          <div className='bg-white md:w-96 w-[21rem] lg:w-80 p-4 rounded-lg relative lg:left-32'>
            <MdClose
              className='absolute top-2 right-2 text-gray-500 cursor-pointer'
              onClick={handleCloseProfile}
            />
            <h2 className='text-2xl font-bold  mb-4'>Edit Profile</h2>
            <form>
            <div className='grid grid-row-3 gap-4 mb-4'>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>Username:</label>
                <input
                  type='text'
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>Email:</label>
                <input
                  type='email'
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg font-semibold mb-2'>New Password:</label>
                <input
                  type='password'
                  value={editPassword}
                  required
                  onChange={(e) => setEditPassword(e.target.value)}
                  className='text-lg pl-3 border rounded-md'
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                onClick={handleSaveProfile}
                className='bg-blue-700 text-white w-28 border border-blue-700 rounded text-xl h-9 pb-9 hover:bg-blue-800 mr-2'
              >
                Save
              </button>
              <button
                onClick={handleCloseProfile}
                className='bg-gray-300 text-gray-700 w-28 border border-gray-300 rounded text-xl h-9 pb-9 hover:bg-gray-400'
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

export default Admin;
