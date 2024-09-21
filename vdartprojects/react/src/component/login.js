// Import necessary modules and hooks from React and React Router 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiServices'; // Import the loginUser function from the apiServices module

// Define the Login component
const Login = () => {
  // State variables to store the username, password, and any error messages
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages

  // useNavigate hook from React Router to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
   
    try {
      // Call loginUser API function with username and password
      const response = await loginUser({ username, password });
       
      // If successful, store the JWT token in localStorage
      localStorage.setItem('access_token', response.data.access);
      // Redirect the user to the dashboard page
      navigate('/dashboard');
    } catch (error) {
      // If login fails, set an error message to be displayed
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <div className="register-link">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .login-container {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          width: 100%;
        }

        h2 {
          margin-bottom: 20px;
          font-size: 24px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        button {
          background-color: #007bff;
          border: none;
          color: #fff;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #0056b3;
        }

        .register-link {
          text-align: center;
          margin-top: 15px;
        }

        .register-link a {
          color: #007bff;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
