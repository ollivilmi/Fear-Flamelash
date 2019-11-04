import React from 'react';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Character({character, width}) {
    console.log(character);

    return (
        <>
        {
            Object.keys(character).length === 0 ? (
                <p>Your account has no main character!</p>
            ) : (
                <Card text="white">
                    <Card.Body>
                        <Card.Title>{character.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{character.class} {character.role}</Card.Subtitle>
                        <Card.Text>
                            {character.rank}
                        </Card.Text>
                        <ButtonGroup size="sm">
                            <Button variant="dark" className="btn-vert-margin">EPGP</Button>
                            <Button variant="dark" className="btn-vert-margin">Attendance</Button>
                            <Button variant="dark" className="btn-vert-margin">Attunements</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            )
        }
        </>
    )
}