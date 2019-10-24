import React, { Component } from 'react';
import {getUsers, updateUser, createUser, deleteUser} from '../../actions/user';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

function Input ({title, buttonTitle, onClick, user}) {
  const text = React.useRef()

  return (
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">{title}</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control ref={text} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
      <InputGroup.Append>
        <Button variant="dark" onClick={() => onClick(text.current.value, user)}>{buttonTitle}</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

class UserView extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users

    return (
      <div style={{margin: '0.5em 15em'}}>
        {users.length && (
          <Row style={{justifyContent: 'center'}}>
            {users.map((user, index) => {
              return(
                <Row key={index} style={{margin: 10}}>
                  <Input title={JSON.stringify(user)} user={user.name} buttonTitle="Update" onClick={updateUser}/>
                </Row>
              );
            })}
          </Row>
        )}
        <Row>
          <Input title="User" buttonTitle="Add" onClick={createUser}/>
        </Row>
        <Row>
          <Input title="User" buttonTitle="Delete" onClick={deleteUser}/>
        </Row>
      </div>
    );
  }
}

UserView.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  {getUsers},
)(UserView);