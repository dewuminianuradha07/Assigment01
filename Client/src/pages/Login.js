import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data);
        alert('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar"></div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <table className="login-table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="email" className="input-icon">
                    <i className="fa fa-user"></i>
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
                  <label htmlFor="password" className="input-icon">
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
                <td colSpan="2">
                  <button type="submit" className="login-button">LOGIN</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="not-registered">
          Not already registered? <a href="/signup" className="register-link">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;