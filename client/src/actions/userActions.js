

export const sendReferral = referral => dispatch => {

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

