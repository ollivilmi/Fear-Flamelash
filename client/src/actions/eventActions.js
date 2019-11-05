import {UPDATE_EVENTS, UPDATE_SIGNUPS} from './types';
import { stringify } from 'query-string';

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
    .then(json => { return json })
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
    .catch();
}

export const getSignups = (token, eventId) => dispatch => {
    return fetch(`/api/event/signup?${stringify({eventId})}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: UPDATE_SIGNUPS,
            payload: json.signups
        })
    })
    .catch(e => console.log(e))
}

export const submitSignup = (token, eventId, character, status) => {
    return fetch(`/api/event/signup`, {
        method: "POST",
        body: JSON.stringify({eventId, status, character}),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(json => {
        return json.signups;
    })
    .catch(e => console.log(e))
}