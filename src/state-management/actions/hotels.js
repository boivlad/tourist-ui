import { message } from 'antd';
import {
  GET_ALL_HOTEL_ROOMS, GET_ALL_HOTELS, GET_HOTEL, ORDER_ROOM,
} from '../types';
import { api } from '../../utils';

export const getHotels = () => async(dispatch) => {
  const response = await api.getHotels();
  if (response.status === 200) {
    dispatch({
      type: GET_ALL_HOTELS,
      payload: response.data.hotels,
    });
  } else {
    message.error(response.data.message);
  }
};
export const getHotelById = (id) => async(dispatch) => {
  message.loading('Loading hotel info...', 0);
  try {
    const response = await api.getHotelById(id);
    if (response.status === 200) {
      dispatch({
        type: GET_HOTEL,
        payload: response.data.hotel,
      });
    }
  } catch (e) {
    message.error(e.response.data.message);
  } finally {
    message.destroy();
  }
};
export const getRoomsByHotel = (id) => async(dispatch) => {
  message.loading('Loading rooms...', 0);
  try {
    const response = await api.getRoomsByHotel(id);
    if (response.status === 200) {
      dispatch({
        type: GET_ALL_HOTEL_ROOMS,
        payload: response.data.rooms,
      });
    }
  } catch (e) {
    message.error(e.response.data.message);
  } finally {
    message.destroy();
  }
};
export const orderRoom = (data) => async(dispatch) => {
  message.loading('Ordering room...', 0);
  try {
    const response = await api.orderRoom(data);
    if (response.status === 201) {
      dispatch({ type: ORDER_ROOM });
      message.destroy();
      message.success(response.data.message);
    }
  } catch (e) {
    message.destroy();
    message.error(e.response.data.message);
  }
};
