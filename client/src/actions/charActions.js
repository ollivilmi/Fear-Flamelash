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
    .then(res => res.json())
    .then(json => { return json.message }) // User feedback
    .catch(e => { return "error: " + e });
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
    .then(res => { return res.json()})
    .catch();
}

export const getCharacter = (token) => dispatch => {
    return fetch('/api/character', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: USER_CHARACTER,
            payload: json.character
        })
    })
    .catch()
}

export const getCharacters = token => dispatch => {
    return fetch('/api/character/all', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        },
    })
    .then(res => res.json()) // array of all characters with priority > 0
    .then(payload => {       // {name, class, role, ep, gp, priority}
        dispatch({
            type: UPDATE_CHARACTERS,
            payload
        })
    })
    .catch();
}

