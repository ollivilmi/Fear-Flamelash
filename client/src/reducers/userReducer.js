import {LOGIN} from '../actions/types';

const initialState = {
  token: null,
  profile: {}
};

  
export default function(state = initialState, action) {
    switch (action.type) {

      case LOGIN:
        return {
          ...state,
          token: action.payload.token,
          profile: action.payload.user
        };
  
      default:
        return state;
    }
}