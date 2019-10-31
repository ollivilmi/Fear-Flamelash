import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CharacterCreation({token, createCharacter}) {
    const classes = [
      "warrior", "rogue", "mage", "warlock", "druid", "shaman", "priest", "hunter"
    ]
  
    const roles = [
      "tank", "healer", "melee", "ranged"
    ]
  
    const [role, setRole] = React.useState("tank");
    const [charClass, setCharClass] = React.useState("warrior");
  
    return (
      <div className="my-auto">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="charName">Name</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
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
                  {roles.map(role => (
                    <Dropdown.Item eventKey={role}>{role}</Dropdown.Item>
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
              {classes.map(charClass => (
                <Dropdown.Item eventKey={charClass}>{charClass}</Dropdown.Item>
              ))
              }
            </DropdownButton>
          </InputGroup.Append>
        </InputGroup>
  
        <Button variant="dark">
          Create
        </Button>
      </div>
    )
  }