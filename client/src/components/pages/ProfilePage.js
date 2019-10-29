import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Col from 'react-bootstrap/Col';
import NavigationBar from '../NavigationBar';

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
            user.role === 'none' ? 
              <p>Input referral code to gain member access</p> 
              : 
              <p>{user.role}</p>
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
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfilePage);