import {LOGIN} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  profile: localStorage.getItem('profile')
};

  
export default function(state = initialState, action) {
    switch (action.type) {

      case LOGIN:
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("profile", action.payload.profile)
        
        return {
          ...state,
          token: action.payload.token,
          profile: action.payload.profile
        };
  
      default:
        return state;
    }
}