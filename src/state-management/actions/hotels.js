import { message } from 'antd';
import { GET_HOTELS } from '../types';
import { api } from '../../utils';

export const getHotels = () => async(dispatch) => {
  const response = await api.getHotels();
  if (response.status === 200) {
    dispatch({
      type: GET_HOTELS,
      payload: response.data.hotels,
    });
  } else {
    message.error(response.data.message);
  }
};
