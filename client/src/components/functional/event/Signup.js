import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { submitSignup } from '../../../actions/eventActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import {UPDATE_SIGNUPS} from '../../../actions/types';

export default function Signup({event}) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token);
    const character = useSelector(state => state.character.main);

    const statusSelection = [
        "accept",
        "tentative",
        "decline"
    ]

    const [status, setStatus] = React.useState("accept");

    const signupHandler = async () => {
      const signups = await submitSignup(token, event._id, character._id, status);
      dispatch({
        type: UPDATE_SIGNUPS,
        payload: signups
      })
    }

    return (
      <>
        <InputGroup.Text id="referralCode">{character.name}</InputGroup.Text>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          id="status"
          title={status}
          onSelect={selectedStatus => setStatus(selectedStatus)}
          value={status}
        >
          {statusSelection.map((role, index) => (
            <Dropdown.Item key={index} eventKey={role}>{role}</Dropdown.Item>
          ))
          }
        </DropdownButton>
        <Button 
          onClick={signupHandler} 
          variant="dark">
          Submit
        </Button>
      </>
    )
  }