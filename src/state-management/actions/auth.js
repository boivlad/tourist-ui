import { message } from 'antd';
import {
  LOGIN, LOGOUT, REGISTRATION, REGISTRATION_MANAGER,
} from '../types';
import { api, functions } from '../../utils';

export const login = (username) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: username,
  });
};
export const registrationRequest = (userData) => async(dispatch) => {
  try {
    const response = await api.registration(userData);
    if (response.status === 201) {
      message.success(response.data.message);
      dispatch({
        type: REGISTRATION,
      });
    } else {
      message.error(response.data.message);
    }
  } catch (e) {
    message.error(e.response.data.message);
  }
};

export const registrationManagerRequest = (userData) => async(dispatch) => {
  try {
    const response = await api.registrationManager(userData);
    if (response.status === 201) {
      message.success(response.data.message);
      dispatch({
        type: REGISTRATION_MANAGER,
      });
    } else {
      message.error(response.data.message);
    }
  } catch (e) {
    message.error(e.response.data.message);
  }
};

export const loginRequest = (user) => async(dispatch) => {
  try {
    const response = await api.login(user.name, user.enPassword);
    if (response.status === 200 && response.data.token) {
      message.success('Welcome');
      functions.setAuthorizationToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      dispatch(login(user.name));
      return true;
    }
    message.error(response.data.message);
  } catch (e) {
    message.error(e);
  }
  return false;
};
export const logout = () => async(dispatch) => {
  await api.logout();
  localStorage.removeItem('token');
  functions.setAuthorizationToken();
  dispatch({
    type: LOGOUT,
  });
};
