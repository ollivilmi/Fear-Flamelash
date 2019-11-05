import React from 'react';
import {createCharacter} from '../../../actions/charActions';
import { useSelector } from 'react-redux';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CharacterCreation() {
    const token = useSelector(state => state.user.token);

    const classes = [
      "Warrior", "Rogue", "Mage", "Warlock", "Druid", "Shaman", "Priest", "Hunter"
    ]
  
    const roles = [
      "Tank", "Healer", "Melee", "Ranged"
    ]

    
    const name = React.useRef();
    const [role, setRole] = React.useState("Tank");
    const [charClass, setCharClass] = React.useState("Warrior");
    const [message, setMessage] = React.useState('');

    const onSubmit = () => {
      createCharacter(token, {
        name: name.current.value,
        role,
        class: charClass
      }).then(msg =>
        setMessage(msg)
      )
    }

    return (
      <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="charName">New character</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={name}
              required
              type="text"
              placeholder="Enter name"
            />
            <InputGroup.Append>
              <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    id="charRole"
                    title={role}
                    onSelect={selectedRole => setRole(selectedRole)}
                    value={role}
                  >
                    {roles.map((role, index) => (
                      <Dropdown.Item key={index} eventKey={role}>{role}</Dropdown.Item>
                    ))
                    }
                </DropdownButton>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  id="charClass"
                  title={charClass}
                  onSelect={selectedClass => setCharClass(selectedClass)}
                  value={charClass}
                >
                {classes.map((charClass, index) => (
                  <Dropdown.Item key={index} eventKey={charClass}>{charClass}</Dropdown.Item>
                ))
                }
              </DropdownButton>
              <Button variant="dark" onClick={() => onSubmit()}>
                Create
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <p>{message}</p>
      </Col>
    )
  }