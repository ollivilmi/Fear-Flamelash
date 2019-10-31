import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCharacters } from '../../actions/charActions';

import NavigationBar from '../functional/NavigationBar';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

class PointsPage extends Component {
  componentDidMount() {
    this.props.getCharacters(this.props.user.token);
  }

  render() {
    console.log(this.props.characters);

    return (
      <>
        <NavigationBar/>
        <Row>
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Character</th>
              <th>Class</th>
              <th>Role</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.characters.map((character, index) => (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{character.class}</td>
                  <td>{character.role}</td>
                  <td>{(character.priority)}</td>
                </tr>
              ))
            }
          </tbody>
          </Table>
        </Row>
      </>
    );
  }
}

PointsPage.propTypes = {
  user: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  characters: state.character.characters
});

export default connect(mapStateToProps,{getCharacters})(PointsPage);