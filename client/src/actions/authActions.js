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
            payload: json.token,
        });
    })
    .catch(e => console.log(e));
}
