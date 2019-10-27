import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Row from 'react-bootstrap/Row'

class PointsPage extends Component {
  componentDidMount() {
  }

  render() {

    return (
        <Row style={{justifyContent: 'center'}}>
          <p>{JSON.stringify(this.props.user.profile)}</p>
        </Row>
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