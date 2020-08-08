import { message } from 'antd';
import { GET_TRANSFERS } from '../types';
import { api } from '../../utils';

export const getTransfers = () => async(dispatch) => {
  const response = await api.getTransfers();
  if (response.status === 200) {
    dispatch({
      type: GET_TRANSFERS,
      payload: response.data.transfers,
    });
  } else {
    message.error(response.data.message);
  }
};
