import React, { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';

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
        const userId = result.user.uid;
        localStorage.setItem('userId', userId); // Store user ID in localStorage
        console.log("Google Login successful:", result.user);
        console.log("User ID", userId);
        navigate('/app'); // Redirect to App.jsx
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <div className="text-center">
          <p>Or</p>
          <button onClick={handleGoogleLogin} className="button google-button">
            Login with Google
          </button>
          <p className="register-link">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;