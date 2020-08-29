import { GET_ALL_HOTELS, GET_HOTEL } from '../types';

const initialState = {
  hotels: [],
  currentHotel: null,
};

const handleGetHotels = (state, hotels) => ({
  ...state,
  hotels,
});
const handleGetTour = (state, currentHotel) => ({
  ...state,
  currentHotel,
});
const handlers = {
  [GET_ALL_HOTELS]: handleGetHotels,
  [GET_HOTEL]: handleGetTour,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
