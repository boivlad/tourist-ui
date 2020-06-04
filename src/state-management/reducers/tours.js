import { GET_TOURS } from '../types';

const initialState = {
  tours: [],
};

const handleGetTours = (tours) => ({
  tours,
});

const handlers = {
  [GET_TOURS]: handleGetTours,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(action.payload) : state;
};
