import {UPDATE_EVENTS} from './types';

export const createEvent = (token, event) => {
    return fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(json => { return json.message })
    .catch(e => console.log(e));
}

export const getEvents = token => dispatch => {
    return fetch('/api/event', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(json => { 
        dispatch({
            type: UPDATE_EVENTS,
            payload: json.events
        })
     })
    .catch(e => console.log(e));
}