import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import NavigationBar from '../NavigationBar';
import {sendReferral, updateUserInfo} from '../../actions/authActions';

function Referral({userId, sendReferral, updateUserInfo}) {
  const code = React.useRef();

  return (
    <>
      <p>You are not a member. Send referral code from guild info to become one.</p>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className="app" id="referralCode">Referral code</InputGroup.Text>
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
    </>
  )
}

class ProfilePage extends Component {
  componentDidMount() {
  }

  render() {
    const user = this.props.user.profile
    console.log(user);

    return (
      <>
        <NavigationBar/>

        <Col style={{textAlign: 'center'}}>
          <h1>{user.email}</h1>
          {
            user.role === 'none' ? (
              <Referral
                sendReferral={sendReferral}
                updateUserInfo={() => this.props.updateUserInfo(this.props.user.token)}
                userId={user.id} 
              />
            )
            : ( 
              <p>{user.role}</p>
            )
          }
          {
            user.character ?
              <p>Your account has no character! Add character here.</p>
              :
              <p>{user.character}</p>
          }
        </Col>
      </>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps,{updateUserInfo})(ProfilePage);