import React, { Component } from 'react';
import {loginLocal} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

class LoginPage extends Component {
  render() {
    const email = React.createRef();
    const password = React.createRef();

    return (

    <Row style={{marginTop: "15em"}} className="justify-content-md-center">

      <Form>
        <Form.Text><h1 class="header">Fear-Flamelash</h1></Form.Text>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={() => this.props.loginLocal(email.current.value, password.current.value)} variant="dark">
          Login
        </Button>
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