import { GET_ALL_TOURS, GET_TOUR } from '../types';

const initialState = {
  tours: [],
  currentTour: null,
};

const handleGetAllTours = (state, tours) => ({
  ...state,
  tours,
});
const handleGetTour = (state, currentTour) => ({
  ...state,
  currentTour,
});

const handlers = {
  [GET_ALL_TOURS]: handleGetAllTours,
  [GET_TOUR]: handleGetTour,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
