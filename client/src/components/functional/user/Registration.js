import React, { useState } from 'react';
import { registerLocal } from '../../../actions/authActions';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { IoIosLogIn } from "react-icons/io";
import { FiMail, FiKey } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import Collapse from 'react-bootstrap/Collapse';

export default function Registration() {
    const [open, setOpen] = useState(false);
    const [validated, setValidated] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const registerEmail = React.useRef();
    const registerPassword = React.useRef();
    const registerPasswordConfirm = React.useRef();

    const [message, setMessage] = useState('');
  
    const handleSubmit = async event => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
  
      if (form.checkValidity()) {
        if (registerPassword.current.value !== registerPasswordConfirm.current.value) {
          setPasswordsMatch(false);
        } else {
          setPasswordsMatch(true);
          const msg = await registerLocal(registerEmail.current.value, registerPassword.current.value)
          setMessage(msg)
        }
      }
  
      setValidated(true);
    }
  
  
    return (
      <>
        <Button 
          variant="dark" 
          onClick={() => setOpen(!open)} 
          aria-controls="registerForm"
          aria-expanded={open}
          block
        >
          Register {open ? <IoIosArrowUp/> : <IoIosArrowDown/>}
        </Button>
        <Collapse in={open}>
          <Form 
            id="registerForm"
            validated={validated}
            style={{margin: "2em 2em"}}
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="registerEmail">
              <Form.Label><FiMail/> Email</Form.Label>
              <Form.Control
                required
                ref={registerEmail}
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please set your email.
              </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group controlId="registerPassword">
              <Form.Label><FiKey/> Password</Form.Label>
              <Form.Control
                required
                name="password"
                ref={registerPassword}
                type="password"
                placeholder="Password"
                isInvalid={!passwordsMatch}
              />
              <Form.Control.Feedback type="invalid">
                Password empty or does not match.
              </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group controlId="registerPasswordConfirm">
              <Form.Label> Confirm password</Form.Label>
              <Form.Control 
                required
                ref={registerPasswordConfirm}
                type="password"
                placeholder="Password"
                isInvalid={!passwordsMatch}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
                Password empty or does not match.
            </Form.Control.Feedback>
            <Col>
              <Button type="submit" variant="dark" block>
                Register < IoIosLogIn/>
              </Button>
            </Col>
            <Form.Text className="text-muted header">{message}</Form.Text>
          </Form>
        </Collapse>
      </>
    )
  }