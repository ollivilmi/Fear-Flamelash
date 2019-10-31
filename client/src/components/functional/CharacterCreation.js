import React from 'react';
import {createCharacter} from '../../actions/charActions';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CharacterCreation({token}) {
    const classes = [
      "warrior", "rogue", "mage", "warlock", "druid", "shaman", "priest", "hunter"
    ]
  
    const roles = [
      "tank", "healer", "melee", "ranged"
    ]
  
    const name = React.useRef();
    const [role, setRole] = React.useState("tank");
    const [charClass, setCharClass] = React.useState("warrior");

    const onSubmit = () => {
      createCharacter(token, {
        name: name.current.value,
        role,
        class: charClass
      })
    }

    return (
      <Col>
        <Col className="form-lg-centered">
          Add new character
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="charName">Name</InputGroup.Text>
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
        </Col>


      </Col>
    )
  }