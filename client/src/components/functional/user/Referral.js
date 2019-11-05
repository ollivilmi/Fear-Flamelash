
import React from 'react';
import { UPDATE_USER } from '../../../actions/types';
import { useDispatch } from 'react-redux'

import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function Referral({userId, sendReferral}) {
    const dispatch = useDispatch()

    const code = React.useRef();
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async () => {
      const res = await sendReferral(userId, code.current.value)
      if (res.profile) {
        console.log(res);
        dispatch({
          type: UPDATE_USER,
          payload: res.profile
        })
      } else {
        setErrorMessage(res.message);
      }
    }
  
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
                onClick={handleSubmit} 
                variant="dark">
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <p className="text-muted header">{errorMessage}</p>
      </Col>
    )
  }