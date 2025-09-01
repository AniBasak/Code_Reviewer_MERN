import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      console.log('Registration successful');
      navigate('/'); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await doSignInWithGoogle();
      console.log('Google Registration successful:', result.user);
      navigate('/app'); // Redirect to App.jsx
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">
              Password:
              <span className="password-toggle" onClick={toggleShowPassword}>
                {showPassword ? '🔓' : '🔒'}
              </span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Confirm Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
        <div className="text-center">
          <p>Or</p>
          <button onClick={handleGoogleRegister} className="button google-button">
            Register with Google
          </button>
          <p className="login-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/')}>
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;