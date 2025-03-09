import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' 
  ? "https://fitness-tracker-backend-5z6i.onrender.com/api"
  : "http://localhost:8080/api";

console.log('API Base URL:', baseURL);
console.log('Environment:', process.env.NODE_ENV);

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor for debugging
API.interceptors.request.use((config) => {
  // Add timestamp to avoid caching
  const timestamp = new Date().getTime();
  config.url = `${config.url}${config.url.includes('?') ? '&' : '?'}_t=${timestamp}`;

  console.log('API Request:', {
    url: config.url,
    baseURL: config.baseURL,
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
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
        config: error.config
      });
    } else if (error.request) {
      console.error('Request Error:', {
        request: error.request,
        config: error.config
      });
    } else {
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
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
