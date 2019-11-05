import {UPDATE_CHARACTERS, USER_CHARACTER} from '../actions/types';

const initialState = {
    characters: [],
    main: {}
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
          main: action.payload
        }

      default:
        return state;
    }
}