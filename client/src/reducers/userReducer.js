import {LOGIN, UPDATE_USER} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  profile: localStorage.getItem('profile')
};

export default function(state = initialState, action) {
    switch (action.type) {

      case LOGIN:
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("profile", JSON.stringify(action.payload.profile))
        
        return {
          ...state,
          token: action.payload.token,
          profile: action.payload.profile
        };

      case UPDATE_USER:
        localStorage.setItem("profile", JSON.stringify(action.payload))

        console.log(action.payload);
        console.log(typeof action.payload);

        return {
        ...state,
        profile: action.payload
      }

      default:
        return state;
    }
}