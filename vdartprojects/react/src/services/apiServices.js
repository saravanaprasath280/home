import axios from 'axios';

// Base URL for API requests
export const API_URL = 'http://localhost:8000/api/';

// Create an Axios instance with a base URL
const apiInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh token

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await apiInstance.post('register/', userData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await apiInstance.post('login/', credentials, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Log the entire response to inspect its structure
    console.log('Full API Response:', response);

    // Ensure the response has the expected structure before accessing data
    if (response.data && response.data.access) {
      // Store tokens in localStorage upon successful login
      localStorage.setItem('access_token', response.data.access);
      return response.data.access; // Return access token for further use
    } else {
      // If the access token is missing, throw an error
      throw new Error('Access token is missing from the response');
    }
  } catch (error) {
    // Log detailed error information for debugging
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    // Optionally, throw a user-friendly error for the UI
    throw new Error(error.response ? error.response.data.detail : 'Login failed. Please try again.');
  }
};


// Function to get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await apiInstance.get('dashboard/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to upload a profile image
export const uploadProfileImage = async (formData) => {
  try {
    const response = await apiInstance.post('upload-profile-image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error.response ? error.response.data : error.message);
    throw error;
  }
};
