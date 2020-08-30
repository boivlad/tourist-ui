import { message } from 'antd';
import { GET_ALL_TRANSFERS, GET_TRANSFER, ORDER_TRANSFER } from '../types';
import { api } from '../../utils';

export const getTransfers = () => async(dispatch) => {
  message.loading('Loading transfers list...', 0);
  const response = await api.getTransfers();
  message.destroy();
  if (response.status === 200) {
    dispatch({
      type: GET_ALL_TRANSFERS,
      payload: response.data.transfers,
    });
  } else {
    message.error(response.data.message);
  }
};
export const getTransferById = (id) => async(dispatch) => {
  message.loading('Loading transfer info...', 0);
  try {
    const response = await api.getTransferById(id);
    if (response.status === 200) {
      dispatch({
        type: GET_TRANSFER,
        payload: response.data.transfer,
      });
    }
  } catch (e) {
    message.error(e.response.data.message);
  } finally {
    message.destroy();
  }
};
export const orderTransfer = (data) => async(dispatch) => {
  message.loading('Ordering transfer...', 0);
  try {
    const response = await api.orderTransfer(data);
    if (response.status === 201) {
      dispatch({ type: ORDER_TRANSFER });
      message.destroy();
      message.success(response.data.message);
    }
  } catch (e) {
    message.destroy();
    message.error(e.response.data.message);
  }
};
