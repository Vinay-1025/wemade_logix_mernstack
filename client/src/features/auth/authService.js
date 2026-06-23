import axios from 'axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      await axios.post(API_URL + 'logout', {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
  } catch (error) {
    console.error('Logout api request failed:', error);
  } finally {
    localStorage.removeItem('user');
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
