import {USERS} from './types';

export const getUsers = () => dispatch => {
    return fetch('/api/user')
    .then(res => res.json())
    .then(users => {
        dispatch({
            type: USERS,
            payload: users,
        });
    })
    .catch(e => console.log(e));
}

export const updateUser = user => {
    return fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => console.log("updated user " + user))
    .catch(e => console.log(e));
}

export const createUser = user => {
    return fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => console.log("created user " + user))
    .catch(e => console.log(e));
}

export const deleteUser = user => {
    return fetch('/api/user', {
        method: 'DELETE',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => console.log("deleted user " + user))
    .catch(e => console.log(e));
}