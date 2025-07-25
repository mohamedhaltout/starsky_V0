import React, { useState } from 'react';
import { loginUser, getCurrentUser } from '../utils/authUtils';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(username, password);
    setMessage(result.message);
    if (result.success) {
      onLoginSuccess(getCurrentUser());
      setUsername('');
      setPassword('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-300 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-button-gradient bg-button-gradient text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;