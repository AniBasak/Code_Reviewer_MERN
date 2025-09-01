import React, { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await doSignInWithEmailAndPassword(email, password);
      const userId = userCredentials.user.uid;
      console.log("Login successful, user ID:", userId);
      localStorage.setItem('userId', userId); // Store user ID in localStorage
      navigate('/app'); // Redirect to App.jsx
    } catch (err) {
        setError(err.message);
    }
};

const handleGoogleLogin = async () => {
    try {
        const result = await doSignInWithGoogle();
        console.log("Google Login successful:", result.user);
        navigate('/app'); // Redirect to App.jsx
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <div className="text-center">
            <p>Or</p>
            <button
                onClick={handleGoogleLogin}
                className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
                Login with Google
            </button>
            <p className="mt-4">
                Don't have an account?{' '}
                <span
                onClick={() => navigate('/register')}
                className="text-blue-500 cursor-pointer hover:underline"
                >
                Register here
                </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;