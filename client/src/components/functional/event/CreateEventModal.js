import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import {createEvent} from '../../../actions/eventActions';
import { UPDATE_EVENTS } from '../../../actions/types';

export default function CreateEventModal({date, show, onHide}) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token);

    // form
    const title = React.useRef();
    const description = React.useRef();
    const start = React.useRef();
    const end = React.useRef();

    // feedback
    const [message, setMessage] = React.useState('')


    const handleSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const [startHours, startMinutes] = start.current.value.split(":");
            const [endHours, endMinutes] = end.current.value.split(":");

            const startDate = moment(date).add(startHours, 'h').add(startMinutes, 'm').toDate()
            const endDate = moment(date).add(endHours, 'h').add(endMinutes, 'm').toDate()

            if (startDate.getTime() > endDate.getTime()) {
                throw Error("end date must be greater than start date")
            }

            const newEvent = {
                title: title.current.value,
                description: description.current.value,
                start: startDate,
                end: endDate
            }

            createEvent(token, newEvent).then(res => {
                setMessage(res.message);
                dispatch({
                    type: UPDATE_EVENTS,
                    payload: res.events
                })
            });
        }
        catch(err) {
            setMessage("Failed to create event... " + err)
        }
    }

    return (
        <>
            <Modal 
                show={show}
                onHide={onHide}
                centered={true}
                size="md"
            >
                {date && (

                    <>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create Event
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            id="createEvent"
                            style={{margin: "2em 2em"}}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="eventName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    ref={title}
                                    type="text"
                                    placeholder="Enter title"
                                />
                            </Form.Group>
                            <Form.Group controlId="eventDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    ref={description}
                                    type="text"
                                    placeholder="Enter description"
                                />
                            </Form.Group>
                            <Form.Group controlId="eventStart">
                                <Form.Label>Start</Form.Label>
                                <Form.Control
                                    required
                                    ref={start}
                                    type="text"
                                    placeholder="hh:mm"
                                    maxLength="5"
                                />
                            </Form.Group>
                            <Form.Group controlId="eventEnd">
                                <Form.Label>End</Form.Label>
                                <Form.Control
                                    required
                                    ref={end}
                                    type="text"
                                    placeholder="hh:mm"
                                    maxLength="5"
                                />
                            </Form.Group>
                        <Button variant="dark" type="submit" block>
                            Create
                        </Button>
                        </Form>
                         {message}
                    </Modal.Body>
                    </>
                )
                }

            </Modal>
        </>
    )
}