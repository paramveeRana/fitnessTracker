import axios from "axios";

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://fitness-tracker-backend-5z6i.onrender.com/api/"
    : "http://localhost:8080/api/",
  headers: {
    'Content-Type': 'application/json',
  },
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
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response;
  } catch (error) {
    console.error('SignUp Error:', error.response?.data || error.message);
    throw error;
  }
};

export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    return response;
  } catch (error) {
    console.error('SignIn Error:', error.response?.data || error.message);
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
