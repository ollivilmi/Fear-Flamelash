import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getEvents} from '../../actions/eventActions';

import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';

import NavigationBar from '../functional/NavigationBar';
import Row from 'react-bootstrap/Row';
import Event from '../functional/Event';
import CreateEvent from '../functional/CreateEvent';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEvent: false,
      showCreateEvent: false,
      slots: null,
      event: null
    };
  }

  componentDidMount() {
    this.props.getEvents(this.props.token);
  }

  render() {
    const toggleEventModal = event => {
      this.setState(state => ({
        showEvent: !state.showEvent,
        event: event
      }))
    }

    const toggleCreateEventModal = slots => {
      this.setState(state => ({
        showCreateEvent: !state.showCreateEvent,
        date: (slots && slots.start) || null
      }))
    }

    return (
      <>
        <NavigationBar />
        <Row style={{justifyContent: 'center'}} >
          <Event 
            show={this.state.showEvent} 
            onHide={toggleEventModal}
            event={this.state.event}
          />
          <CreateEvent
            show={this.state.showCreateEvent} 
            onHide={toggleCreateEventModal}
            date={this.state.date}
            token={this.props.token}
          />
          <Calendar
            views={{
              month: true,
              agenda: true,
            }}
            localizer={momentLocalizer(moment)}
            events={this.props.events}
            startAccessor="start"
            endAccessor="end"
            style={{height: 400, width: "80%"}}
            selectable={true}
            onSelectSlot={(slot) => {
              if (this.props.role === 'admin') {
                toggleCreateEventModal(slot)
              }
           }}
            onSelectEvent={event => {
              toggleEventModal(event)
           }}
          />
        </Row>
      </>
    );
  }
}

EventPage.propTypes = {
  user: PropTypes.object,
  events: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  role: state.user.profile.role,
  token: state.user.token,
  events: state.event.events
});

export default connect(mapStateToProps,{getEvents})(EventPage);