import { GET_ALL_TRANSFERS, GET_TRANSFER } from '../types';

const initialState = {
  transfers: [],
  currentTransfer: null,
};

const handleGetAllTransfers = (state, transfers) => ({
  ...state,
  transfers,
});
const handleGetTransfer = (state, currentTransfer) => ({
  ...state,
  currentTransfer,
});

const handlers = {
  [GET_ALL_TRANSFERS]: handleGetAllTransfers,
  [GET_TRANSFER]: handleGetTransfer,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
