import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    if (!cleanedEmail || !cleanedPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');

    try {
      await login({ Email: cleanedEmail, Password: cleanedPassword });
      window.location.reload()
      navigate('/');
    } catch (err) {
      const errMsg = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      toast.error(errMsg);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login to Your Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        {/* 
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
