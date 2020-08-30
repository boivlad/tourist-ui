import { message } from 'antd';
import {
  GET_ALL_TOURS, GET_TOUR, ORDER_ROOM, ORDER_TOUR,
} from '../types';
import { api } from '../../utils';

export const getTours = () => async(dispatch) => {
  const response = await api.getTours();
  if (response.status === 200) {
    dispatch({
      type: GET_ALL_TOURS,
      payload: response.data.tours,
    });
  } else {
    message.error(response.data.message);
  }
};
export const getTourById = (id) => async(dispatch) => {
  message.loading('Loading tour info...', 0);
  try {
    const response = await api.getTourById(id);
    if (response.status === 200) {
      dispatch({
        type: GET_TOUR,
        payload: response.data.tour,
      });
    }
  } catch (e) {
    message.error(e.response.data.message);
  } finally {
    message.destroy();
  }
};
export const orderTour = (data) => async(dispatch) => {
  message.loading('Ordering room...', 0);
  try {
    const response = await api.orderTour(data);
    if (response.status === 201) {
      dispatch({ type: ORDER_TOUR });
      message.destroy();
      message.success(response.data.message);
    }
  } catch (e) {
    message.destroy();
    message.error(e.response.data.message);
  }
};
