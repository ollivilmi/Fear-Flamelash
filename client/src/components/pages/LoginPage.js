import React, { Component } from 'react';
import {loginLocal} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { IoIosLogIn, IoLogoGoogle } from "react-icons/io";
import { FiMail, FiKey } from "react-icons/fi";

class LoginPage extends Component {
  render() {
    const email = React.createRef();
    const password = React.createRef();

    return (

    <Row style={{marginTop: "15em"}} className="justify-content-md-center">

      <Form>
        <Form.Text><h1 className="header">Fear-Flamelash</h1></Form.Text>
        <Form.Group controlId="formBasicEmail">
          <Form.Label><FiMail/> Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label><FiKey/> Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Text className="text-muted">
            New user? Login and your account will be created.
        </Form.Text>
        
        <Col style={{marginTop: "1em"}}>
          <Button onClick={() => this.props.loginLocal(email.current.value, password.current.value)} variant="dark" block>
            Login < IoIosLogIn/>
          </Button>
        </Col>
        <Col style={{marginTop: "1em"}}>
          <Button variant="dark" block>
            Login with Google < IoLogoGoogle/>
          </Button>
        </Col>
      </Form>

      {this.props.token}
    </Row>
    );
  }
}

LoginPage.propTypes = {
  loginLocal: PropTypes.func.isRequired,
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(
  mapStateToProps,
  {loginLocal},
)(LoginPage);