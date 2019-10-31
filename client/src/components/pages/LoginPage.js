import React, { Component } from 'react';
import {loginLocal, loginGoogle, registerLocal} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import { IoIosLogIn, IoLogoGoogle } from "react-icons/io";
import { FiMail, FiKey } from "react-icons/fi";

import Registration from "../functional/Registration";


class LoginPage extends Component {
  render() {
    const loginEmail = React.createRef();
    const loginPassword = React.createRef();
    const buttonMargin = {margin: "1em auto", width: "50%"}

    // If we have login parameters, redirect to events page
    if (this.props.loginGoogle(this.props.location.search) || this.props.token) {
      this.props.history.push(`/events`)
    };

    return (
    <>
    <Col style={{margin: "2em auto 0em auto", width: "50%"}} className="justify-content-md-center">
      <Form>
        <Form.Group controlId="loginEmail">
          <Form.Label><FiMail/> Email</Form.Label>
          <Form.Control ref={loginEmail} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label><FiKey/> Password</Form.Label>
          <Form.Control ref={loginPassword} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Text className="text-muted">
            We don't know your password.
        </Form.Text>
      </Form>
    </Col>
    <Col className="justify-content-md-center">
      <Col style={buttonMargin}>
        <Button onClick={() => this.props.loginLocal(loginEmail.current.value, loginPassword.current.value)} variant="dark" block>
          Login < IoIosLogIn/>
        </Button>
      </Col>
      <Col style={buttonMargin}>
        <a href="/api/auth/google">
          <Button variant="dark" block>
            Login with Google < IoLogoGoogle/>
          </Button>
        </a>
      </Col>
      <Col style={buttonMargin}>
          <Registration register={this.props.registerLocal}/>
      </Col>
    </Col>
    </>
    );
  }
}



LoginPage.propTypes = {
  loginLocal: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(
  mapStateToProps,
  {loginLocal,loginGoogle,registerLocal},
)(LoginPage);