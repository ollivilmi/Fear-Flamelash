import {UPDATE_EVENTS, UPDATE_SIGNUPS} from '../actions/types';

const initialState = {
    events: [],
    signups: []
};

export default function(state = initialState, action) {
    switch (action.type) {

      case UPDATE_EVENTS:
        return {
        ...state,
        events: action.payload
      }

      case UPDATE_SIGNUPS:
        return {
          ...state,
          signups: action.payload
        }

      default:
        return state;
    }
}