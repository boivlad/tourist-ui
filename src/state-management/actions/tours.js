import { message } from 'antd';
import { GET_TOURS } from '../types';
import { api } from '../../utils';

export const getTours = () => async(dispatch) => {
  const response = await api.getTours();
  if (response.status === 200) {
    console.log(response.data);
    dispatch({
      type: GET_TOURS,
      payload: response.data.tours,
    });
  } else {
    message.error(response.data.message);
  }
};
