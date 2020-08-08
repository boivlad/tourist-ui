import { GET_TRANSFERS } from '../types';

const initialState = {
  transfers: [],
};

const handleGetTransfers = (transfers) => ({
  transfers,
});

const handlers = {
  [GET_TRANSFERS]: handleGetTransfers,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(action.payload) : state;
};
