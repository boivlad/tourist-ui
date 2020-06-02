import { GET_HOTELS } from '../types';

const initialState = {
  hotels: [],
};

const handleGetHotels = (hotels) => ({
  hotels,
});

const handlers = {
  [GET_HOTELS]: handleGetHotels,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(action.payload) : state;
};
