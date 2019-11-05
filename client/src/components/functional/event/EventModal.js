import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Signup from './Signup';
import SignupTable from './SignupTable';
import CharacterLink from '../character/CharacterLink';
import { useSelector } from 'react-redux'
import { deleteEvent } from '../../../actions/eventActions';

// Character is needed for signing up
export default function EventModal({event, show, onHide}) {
    let start;
    let end;
    // let timeLeft;

    const signups = useSelector(state => state.event.signups);
    const character = useSelector(state => state.character.main);
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.profile);

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
                        {
                            user.role === 'admin' && (
                                <>
                                    <Button variant="dark" onClick={onHide}>
                                        Edit
                                    </Button>
                                    <Button variant="dark" onClick={() => {
                                        deleteEvent(token, event._id)
                                        .then(window.location.reload())
                                    }}>
                                        Delete
                                    </Button>
                                </>
                            )
                        }
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