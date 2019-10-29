import {LOGIN} from './types';
import queryString from 'query-string';

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

export const loginGoogle = search => dispatch => {
  if (Object.keys(search).length === 0) {
      return
  }

  const login = queryString.parse(search);
  console.log(login);

  dispatch({
    type: LOGIN,
    payload: {token: login.token, user: login.user}
  });
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