import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../components/firebase'; 

const UserInfoPopup = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;
  
  useEffect(() => {
    if (currentUser) {
      const { email, uid, metadata: { creationTime } } = currentUser;
      setUserInfo({ email, uid, creationTime });
    }
  }, [currentUser]);
  
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div onClick={handleToggleModal} className="text-blue-500 cursor-pointer">
        {currentUser ? `User Information Profile` : 'Login'}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">User Information</h2>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>User ID:</strong> {userInfo.uid}</p>
            <p><strong>Date Joined:</strong> {userInfo.creationTime}</p>
            <button onClick={handleToggleModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoPopup;
