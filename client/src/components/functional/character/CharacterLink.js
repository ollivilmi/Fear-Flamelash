import React from 'react';
import {linkCharacter} from '../../../actions/charActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import { USER_CHARACTER } from '../../../actions/types';

export default function CharacterLink() {
    const name = React.useRef();
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = async () => {
      const res = await linkCharacter(token, {
        name: name.current.value,
      });

      if (res.character) {
        dispatch({
          type: USER_CHARACTER,
          payload: res.character
        })
      } else {
        setErrorMessage(res.message);
      }
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
        <p className="text-muted header">{errorMessage}</p>
      </Col>
    )
  }