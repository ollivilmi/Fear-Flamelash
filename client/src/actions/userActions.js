import {FETCH_USERS} from './types';

class User {
    constructor(name, ep, gp) {
        this.name = name
        this.ep = ep
        this.gp = gp
    }
}

export const getUsers = () => dispatch => {
    return fetch('/api/user')
    .then(res => res.json())
    .then(users => {
        dispatch({
            type: FETCH_USERS,
            payload: users,
        });
    })
    .catch(e => console.log(e));
}

export const updateUser = (epgp, user) => {
    const [ep, gp] = epgp.split(" ", 2)
    const updatedUser = new User(user, ep, gp);

    return fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
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
        body: JSON.stringify(new User(user, 0, 0)),
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
        body: JSON.stringify({name: user}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => console.log("deleted user " + user))
    .catch(e => console.log(e));
}