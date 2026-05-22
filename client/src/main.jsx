import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from 'axios';
import App from './App.jsx';
import './index.css';

// Configure global API base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

import { logout } from './features/auth/authSlice';

// Intercept unauthorized requests due to deactivated status
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      error.response.data?.message === 'account_inactive'
    ) {
      localStorage.removeItem('user');
      store.dispatch(logout());
      window.location.href = '/login?message=' + encodeURIComponent('Application was inactive for you and consult the management');
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
