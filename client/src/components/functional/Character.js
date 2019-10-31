import React from 'react';
import Col from 'react-bootstrap/Col';

export default function Character({character}) {
    console.log(character);

    return (
        <Col>
        {
            Object.keys(character).length === 0 ? (
                <p>Your account has no main character!</p>
            ) : (
                <p>{JSON.stringify(character)}</p>
            )
        }
        </Col>
    )
}