import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { submitSignup } from '../../../actions/eventActions';

export default function Signup({character, token, event}) {
    const statusSelection = [
        "accept",
        "tentative",
        "decline"
    ]

    const [status, setStatus] = React.useState("accept");

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
          onClick={() => submitSignup(token, event._id, character._id, status)} 
          variant="dark">
          Submit
        </Button>
      </>
    )
  }