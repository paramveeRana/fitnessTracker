import axios from "axios";

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://fitness-tracker-backend-5z6i.onrender.com/api/"
    : "http://localhost:8080/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor for debugging
API.interceptors.request.use((config) => {
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: config.headers,
  });
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const UserSignUp = async (data) => {
  try {
    console.log('Attempting signup with data:', data);
    const response = await API.post("/user/signup", data);
    console.log('Signup successful:', response.data);
    return response;
  } catch (error) {
    console.error('SignUp Error:', {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const UserSignIn = async (data) => {
  try {
    console.log('Attempting signin with data:', data);
    const response = await API.post("/user/signin", data);
    console.log('Signin successful:', response.data);
    return response;
  } catch (error) {
    console.error('SignIn Error:', {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
