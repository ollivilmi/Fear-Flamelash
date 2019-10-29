import React, { Component } from 'react';
import {loginLocal, loginGoogle} from '../../actions/authActions';
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

    this.props.loginGoogle(this.props.location.search);

    // console.log(this.props.location.search);
    // console.log(queryString.parse(this.props.location.search));

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
            Register
        </Form.Text>
        
        <Col style={{marginTop: "1em"}}>
          <Button onClick={() => {
            this.props.loginLocal(email.current.value, password.current.value)
            // fix this garbage asap...
            this.props.history.push(`/events`)
          }
          } variant="dark" block>
            Login < IoIosLogIn/>
          </Button>
        </Col>
        <Col style={{marginTop: "1em"}}>
          <a href="/api/auth/google">
            <Button variant="dark" block>
              Login with Google < IoLogoGoogle/>
            </Button>
          </a>
        </Col>
      </Form>
    </Row>
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