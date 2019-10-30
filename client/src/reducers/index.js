import { combineReducers } from 'redux';
import userReducer from './userReducer';
import charReducer from './charReducer';

export default combineReducers({
  user: userReducer,
  character: charReducer,
});