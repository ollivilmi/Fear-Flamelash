import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Signup from './Signup';
import SignupTable from './SignupTable';
import CharacterLink from '../character/CharacterLink';

// Character is needed for signing up
export default function EventModal({event, show, onHide, character, token, signups}) {
    let start;
    let end;
    // let timeLeft;

    if (event) {
        start = moment(event.start);
        end = moment(event.end);
        // timeLeft = moment(start.diff(moment())).format("HH:mm:ss")
    }

    return (

        <>
            <Modal 
                show={show}
                onHide={onHide}
                centered={true}
                size="md"
            >
                {event && (

                    <>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p>{event.title}</p>
                            <p>{start.format("dddd LT")} - {end.format("LT")}</p>
                        </Modal.Title>
                        <Button variant="dark" onClick={onHide}>
                            Edit
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{event.description}</p>
                        <SignupTable signups={signups} />
                    </Modal.Body>
                    <Modal.Footer>
                        { !character ? (
                            <CharacterLink token={token} />
                        ) : (
                            <Signup
                                token={token}
                                character={character}
                                event={event}
                            />
                        )
                        }
                    </Modal.Footer>
                    </>
                )
                }

            </Modal>
        </>
    )
}