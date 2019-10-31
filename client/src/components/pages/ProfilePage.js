import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendReferral, updateUserInfo} from '../../actions/authActions';

import Col from 'react-bootstrap/Col';
import NavigationBar from '../functional/NavigationBar';
import Referral from '../functional/Referral';
import CharacterCreation from '../functional/CharacterCreation';

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
            typeof user.character === 'undefined' && <p>Your account has no character!</p>
          }
          <CharacterCreation />
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