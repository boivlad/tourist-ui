import { message } from 'antd';
import { LOGIN, LOGOUT } from "../types";
import { api, functions } from "../../utils";

export const login = (username) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: username,
  });
};

const logIn = async (user, dispatch) => {
  const response = await api.login(user.name, user.enPassword);
  if (!response.token) {
    message.error(response.message);
    return;
  }
  functions.setAuthorizationToken(response.token);
  localStorage.setItem('token', response.token);
  dispatch(login(user.name));
}


export const loginRequest = (user) => async dispatch => {
  await logIn(user, dispatch);
};
export const logout = () => async dispatch => {
  await api.logout();
  localStorage.removeItem('token');
  functions.setAuthorizationToken();

  dispatch({
    type: LOGOUT,
  });
};
