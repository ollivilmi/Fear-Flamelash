import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

export default function Event({event, show, onHide}) {
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
                    </Modal.Header>
                    <Modal.Body>
                        signups here
                    </Modal.Body>
                    <Modal.Footer>
                        <p>{event.description}</p>
                        <Button variant="dark" onClick={onHide}>
                            Edit event
                        </Button>
                    </Modal.Footer>
                    </>
                )
                }

            </Modal>
        </>
    )
}