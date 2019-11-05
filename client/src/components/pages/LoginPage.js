import React, { Component } from 'react';
import {loginLocal, loginGoogle} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import { IoIosLogIn, IoLogoGoogle } from "react-icons/io";
import { FiMail, FiKey } from "react-icons/fi";

import Registration from "../functional/user/Registration";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
  }

  render() {
    const loginEmail = React.createRef();
    const loginPassword = React.createRef();
    const buttonMargin = {margin: "1em auto", width: "40%"}

    // If we have login parameters, redirect to events page
    if (this.props.loginGoogle(this.props.location.search) || this.props.token) {
      this.props.history.push(`/events`)
    };

    const localLoginHandler = async () => {
      const errorMessage = await this.props.loginLocal(loginEmail.current.value, loginPassword.current.value)
      if (errorMessage) {
        this.setState({errorMessage});
      }
    }

    return (
    <>
    <Col className="form-md-centered">
      <Form>
        <Form.Group controlId="loginEmail">
          <Form.Label><FiMail/> Email</Form.Label>
          <Form.Control ref={loginEmail} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll sell it.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label><FiKey/> Password</Form.Label>
          <Form.Control ref={loginPassword} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Text className="text-muted">
            We'll steal it.
        </Form.Text>
      </Form>
    </Col>
    <Col className="justify-content-md-center">
      <Col style={buttonMargin}>
        <Button onClick={localLoginHandler} variant="dark" block>
          Login < IoIosLogIn/>
        </Button>
        {
          this.state.errorMessage && 
          <Form.Text className="text-muted">{this.state.errorMessage}</Form.Text>
        }
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
  {loginLocal,loginGoogle},
)(LoginPage);