import {UPDATE_CHARACTERS, USER_CHARACTER} from './types';

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

export const linkCharacter = (token, character) => {
    return fetch('/api/user/linkCharacter', {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
    })
    .then(() => console.log("linked character " + character))
    .catch(e => console.log(e));
}

export const getCharacter = (token) => dispatch => {
    return fetch('/api/character', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(character => {
        dispatch({
            type: USER_CHARACTER,
            payload: character
        })
    })
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

