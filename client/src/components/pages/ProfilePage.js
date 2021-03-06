import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendReferral} from '../../actions/authActions';
import {getCharacter} from '../../actions/charActions';

import Col from 'react-bootstrap/Col';

import NavigationBar from '../functional/NavigationBar';
import Referral from '../functional/user/Referral';
import Character from '../functional/character/Character';
import CharacterCreation from '../functional/character/CharacterCreation';
import CharacterLink from '../functional/character/CharacterLink';

class ProfilePage extends Component {
  componentDidMount() {
    !this.props.token && this.props.history.push(`/`);
    this.props.getCharacter(this.props.token);
  }

  render() {
    const user = this.props.user.profile

    return (
      <>
        <NavigationBar/>
        <Col className="lg-centered">
          <h1>{user.email}</h1>
          {
            user.role === 'none' ? (
              <Referral
                sendReferral={sendReferral}
                userId={user.id} 
              />
            )
            : ( 
              <>
                <p>{user.role}</p>
                <Col className="form-lg-centered">
                  <Character/>
                </Col>
                <Col className="form-lg-centered">
                  <CharacterLink/>
                </Col>
                <Col className="form-lg-centered">
                  <CharacterCreation/>
                </Col>
              </>
            )
          }
        </Col>
      </>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  character: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user,
  character: state.character.main,
  token: state.user.token
});

export default connect(mapStateToProps,{getCharacter})(ProfilePage);