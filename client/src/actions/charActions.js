import {UPDATE_CHARACTERS} from '../actions/types';

export const createCharacter = (token, character) => {

    return fetch('/api/character', {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
    })
    .then(() => console.log("created character " + character))
    .catch(e => console.log(e));
}

export const getCharacters = token => dispatch => {

    return fetch('/api/character/all', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        },
    })
    .then(res => res.json())
    .then(payload => {
        dispatch({
            type: UPDATE_CHARACTERS,
            payload
        })
    })
    .catch(e => console.log(e));
}

