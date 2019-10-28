import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import Row from 'react-bootstrap/Row';

class EventPage extends Component {
  componentDidMount() {
  }

  render() {
    const localizer = momentLocalizer(moment);
    const raidStart = moment().add(1, 'days');
    const raidEnd = raidStart.add(4, 'hours');

    const myEvents = [
      {
        title: "Molten Core",
        start: raidStart,
        end: raidEnd,
      }
    ]

    return (
      <Row>
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{height: 500, width: "100%"}}
        />
      </Row>
    );
  }
}

EventPage.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(EventPage);