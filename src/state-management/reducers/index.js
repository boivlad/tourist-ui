import { combineReducers } from 'redux';

import auth from './auth';
import hotels from './hotels';


export default combineReducers({
  auth,
  hotels,
});
