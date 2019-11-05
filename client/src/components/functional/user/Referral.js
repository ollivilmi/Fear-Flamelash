
import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function Referral({userId, sendReferral, updateUserInfo}) {
    const code = React.useRef();
  
    return (
      <Col>
        <p>You are not a member. Send referral code from guild info to become one.</p>
        <Col className="form-lg-centered">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="referralCode">Referral code</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="insert here"
              aria-describedby="referralCode"
              ref={code}
            />
            <InputGroup.Append>
              <Button 
                onClick={() => sendReferral(userId, code.current.value).then(updateUserInfo)} 
                variant="dark">
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Col>
    )
  }