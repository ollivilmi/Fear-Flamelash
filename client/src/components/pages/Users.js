import React, { Component } from 'react';
import {getUsers, updateUser, createUser, deleteUser} from '../../actions/user';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Input ({title, buttonTitle}) {
  return (
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">{title}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
      <InputGroup.Append>
        <Button variant="dark">{buttonTitle}</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

class List extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users

    return (
      <div style={{margin: '0.5em 15em'}}>
        {users.length && (
          <Row style={{justifyContent: 'center'}}>
            {this.props.users.map((user) => {
              return(
                <Row style={{margin: 10}}>
                  {user.name} {user.ep} {user.gp}
                  <input type="text" name={user.name} />
                  <button class="btn">
                      Update
                  </button>
                </Row>
              );
            })}
          </Row>
        )}
        <Row>
          <Input title="User" buttonTitle="Add"/>
        </Row>
        <Row>
          <Input title="User" buttonTitle="Remove"/>
        </Row>
      </div>
    );
  }
}

List.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  {getUsers},
)(List);