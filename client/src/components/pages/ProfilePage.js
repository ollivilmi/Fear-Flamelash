import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendReferral, updateUserInfo} from '../../actions/authActions';
import {getCharacter} from '../../actions/charActions';

import Col from 'react-bootstrap/Col';

import NavigationBar from '../functional/NavigationBar';
import Referral from '../functional/Referral';
import Character from '../functional/Character';
import CharacterCreation from '../functional/CharacterCreation';
import CharacterLink from '../functional/CharacterLink';

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getCharacter(this.props.token);
  }

  render() {
    const user = this.props.user.profile
    console.log(this.props.character)

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
          <Character character={this.props.character} />
          <CharacterCreation token={this.props.token} />
          <CharacterLink token={this.props.token} />
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
  character: state.character.user,
  token: state.user.token
});

export default connect(mapStateToProps,{updateUserInfo, getCharacter})(ProfilePage);