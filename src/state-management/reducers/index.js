import { combineReducers } from 'redux';

import auth from './auth';
import hotels from './hotels';
import tours from './tours';


export default combineReducers({
  auth,
  hotels,
  tours,
});
