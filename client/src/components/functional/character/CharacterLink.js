import React from 'react';
import {linkCharacter} from '../../../actions/charActions';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

export default function CharacterLink({token}) {
    const name = React.useRef();

    const onSubmit = () => {
      linkCharacter(token, {
        name: name.current.value,
      }).then(window.location.reload());
    }

    return (
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="charName">Main character</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            ref={name}
            required
            type="text"
            placeholder="Enter name"
          />
          <InputGroup.Append>
            <Button variant="dark" onClick={() => onSubmit()}>
              Set
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    )
  }