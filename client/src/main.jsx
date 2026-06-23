import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from 'axios';
import App from './App.jsx';
import './index.css';

import { logout, updateToken } from './features/auth/authSlice';

// Configure global API base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Request interceptor to automatically add the Authorization header
axios.interceptors.request.use(
  (config) => {
    // If request has no Authorization header already set, set it from localStorage
    if (!config.headers['Authorization']) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Intercept responses for token validation and expiration
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle account inactive redirection
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      error.response.data?.message === 'account_inactive'
    ) {
      localStorage.removeItem('user');
      store.dispatch(logout());
      window.location.href = '/login?message=' + encodeURIComponent('Application was inactive for you and consult the management');
      return Promise.reject(error);
    }

    // Handle expired token
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message === 'token_expired' &&
      !originalRequest._retry
    ) {
      // Avoid looping if the refresh request itself fails
      if (originalRequest.url.includes('/api/auth/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const refreshToken = user?.refreshToken;

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call the refresh endpoint
        const response = await axios.post('/api/auth/refresh', { refreshToken });
        const { token: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // Update localStorage
        const updatedUser = {
          ...user,
          token: newAccessToken,
          refreshToken: newRefreshToken || refreshToken,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Sync with Redux store
        store.dispatch(updateToken({ token: newAccessToken, refreshToken: newRefreshToken || refreshToken }));

        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh failed (expired/invalid refresh token), force logout and redirect to login
        localStorage.removeItem('user');
        store.dispatch(logout());
        window.location.href = '/login?message=' + encodeURIComponent('Session expired. Please log in again.');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
