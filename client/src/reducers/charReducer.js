import {UPDATE_CHARACTERS, USER_CHARACTER} from '../actions/types';

const initialState = {
    characters: [],
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

      case UPDATE_CHARACTERS:
        return {
        ...state,
        characters: action.payload
      }

      case USER_CHARACTER:
        return {
          ...state,
          user: action.payload
        }

      default:
        return state;
    }
}