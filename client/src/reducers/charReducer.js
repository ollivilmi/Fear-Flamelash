import {UPDATE_CHARACTERS} from '../actions/types';

const initialState = {
    characters: []
};

export default function(state = initialState, action) {
    switch (action.type) {

      case UPDATE_CHARACTERS:
        return {
        ...state,
        characters: action.payload
      }

      default:
        return state;
    }
}