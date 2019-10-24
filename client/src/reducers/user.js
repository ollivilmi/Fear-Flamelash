import {USERS} from '../actions/types';
  
  const initialState = {
    user: {
      name: 'ollivil',
      email: 'olli.vilmi@gmail.com',
    },
    users: []
  };
  
export default function(state = initialState, action) {
    switch (action.type) {
      case USERS:
        return {
          ...state,
          users: action.payload,
        };
  
      default:
        return state;
    }
}