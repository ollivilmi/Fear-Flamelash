import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import NavigationBar from '../NavigationBar';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

class PointsPage extends Component {
  componentDidMount() {
  }

  render() {
    const user = this.props.user.profile

    return (
      <>
        <NavigationBar/>
        <Row>
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Email</th>
              <th>Created</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
          </Table>
        </Row>
      </>
    );
  }
}

PointsPage.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(PointsPage);