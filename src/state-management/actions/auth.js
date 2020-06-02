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
  const response = await api.registration(userData);
  if (response.status === 201) {
    message.success(response.data.message);
    dispatch({
      type: REGISTRATION,
    });
  } else {
    message.error(response.data.message);
  }
};

export const registrationManagerRequest = (userData) => async(dispatch) => {
  const response = await api.registrationManager(userData);
  if (response.status === 201) {
    message.success(response.data.message);
    dispatch({
      type: REGISTRATION_MANAGER,
    });
  } else {
    message.error(response.data.message);
  }
};

export const loginRequest = (user) => async(dispatch) => {
  const response = await api.login(user.name, user.enPassword);
  if (!response.data.token) {
    message.error(response.data.message);
    return;
  }
  functions.setAuthorizationToken(response.data.token);
  localStorage.setItem('token', response.data.token);
  dispatch(login(user.name));
};
export const logout = () => async(dispatch) => {
  await api.logout();
  localStorage.removeItem('token');
  functions.setAuthorizationToken();

  dispatch({
    type: LOGOUT,
  });
};
