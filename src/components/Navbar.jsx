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
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">CRM</h1>
      {authUser ? (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
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
