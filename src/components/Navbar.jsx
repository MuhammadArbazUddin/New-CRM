import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  return (
    <nav className='absolute right-0 top-0'>
      {authUser ? (
        <button
          onClick={handleLogout}
          className="text-blue-600 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <div className="text-sm"></div>
      )}
    </nav>
  );
};

export default Navbar;
