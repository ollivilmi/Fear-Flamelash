import {UPDATE_EVENTS} from '../actions/types';

const initialState = {
    events: [],
};

export default function(state = initialState, action) {
    switch (action.type) {

      case UPDATE_EVENTS:
        return {
        ...state,
        events: action.payload
      }

      default:
        return state;
    }
}