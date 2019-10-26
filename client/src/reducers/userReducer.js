import {FETCH_USERS, LOGIN} from '../actions/types';
  
  const initialState = {
    token: '',
    users: []
  };
  
export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS:
        return {
          ...state,
          users: action.payload,
        };

      case LOGIN:
        return {
          ...state,
          token: action.payload,
        };
  
      default:
        return state;
    }
}