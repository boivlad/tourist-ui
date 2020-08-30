import axios from 'axios';

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export const getCurrentToken = () => localStorage.getItem('token');
export const getTokenForHeader = () => `Bearer ${getCurrentToken()}`;
