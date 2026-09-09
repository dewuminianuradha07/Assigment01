import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = { name: username, email, password };

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User created successfully:', result);
        alert('Sign-up successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData);
        alert(errorData.message || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-avatar"></div>
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <table className="signup-table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="username" className="signup-input-icon">
                    <i className="fa fa-user"></i>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email" className="signup-input-icon">
                    <i className="fa fa-envelope"></i>
                  </label>
                </td>
                <td>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password" className="signup-input-icon">
                    <i className="fa fa-lock"></i>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="confirmPassword" className="signup-input-icon">
                    <i className="fa fa-lock"></i>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" className="signup-button">Sign Up</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="already-registered">
          Already registered? <a href="/login" className="login-link">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;