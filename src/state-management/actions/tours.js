import { message } from 'antd';
import { GET_ALL_TOURS, GET_TOUR } from '../types';
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
