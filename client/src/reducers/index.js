import { combineReducers } from 'redux';
import userReducer from './userReducer';
import charReducer from './charReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  user: userReducer,
  character: charReducer,
  event: eventReducer
});