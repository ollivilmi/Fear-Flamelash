import {LOGIN} from './types';

export const loginLocal = (email, hash) => dispatch => {
    return fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({email, hash}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: LOGIN,
            payload: json,
        });
    })
    .catch(e => console.log(e));
}

export const loginGoogle = () => {
    
}

export const registerLocal = (email, hash) => dispatch => {
    return fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({email, hash}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: LOGIN,
            payload: json,
        });
    })
    .catch(e => console.log(e));
}