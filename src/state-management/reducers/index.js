import { combineReducers } from 'redux';

import auth from './auth';
import hotels from './hotels';
import tours from './tours';
import transfers from './transfers';


export default combineReducers({
  auth,
  hotels,
  tours,
  transfers,
});
