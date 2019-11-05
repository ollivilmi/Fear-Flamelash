import {LOGIN, UPDATE_USER} from './types';
import queryString from 'query-string';

export const loginLocal = (email, password) => dispatch => {
    return fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.status === 401) {
            throw new Error("Invalid credentials");
        }
        return res.json()
    })
    .then(json => {
        dispatch({
            type: LOGIN,
            payload: json,
        });
    })
    .catch(err => { return err.toString() });
}

export const loginGoogle = search => dispatch => {
  if (Object.keys(search).length === 0) {
      return false
  }

  const login = queryString.parse(search);

  dispatch({
    type: LOGIN,
    payload: {token: login.token, profile: JSON.parse(login.profile)}
  });

  return true
}

export const registerLocal = (email, password) => dispatch => {
    return fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        return json.message;
    })
    .catch(e => {return e});
}

export const sendReferral = (id, referral) => {
    return fetch('/api/auth/referral', {
        method: 'POST',
        body: JSON.stringify({referral, id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        return json.message;
    })
    .catch(e => console.log(e));
}

export const updateUserInfo = token => dispatch => {
    return fetch('/api/user/', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(res => res.json())
    .then(user => {
        console.log(user);
        dispatch({
            type: UPDATE_USER,
            payload: user
        })
    })
}
