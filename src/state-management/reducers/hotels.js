import { GET_ALL_HOTEL_ROOMS, GET_ALL_HOTELS, GET_HOTEL } from '../types';

const initialState = {
  hotels: [],
  currentHotel: null,
};

const handleGetHotels = (state, hotels) => ({
  ...state,
  hotels,
});
const handleGetHotel = (state, currentHotel) => ({
  ...state,
  currentHotel,
});
const handleGetHotelRooms = (state, rooms) => ({
  ...state,
  currentHotel: { ...state.currentHotel, rooms },
});
const handlers = {
  [GET_ALL_HOTELS]: handleGetHotels,
  [GET_HOTEL]: handleGetHotel,
  [GET_ALL_HOTEL_ROOMS]: handleGetHotelRooms,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
