import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getEvents} from '../../actions/eventActions';
import {getCharacter} from '../../actions/charActions';
import {getSignups} from '../../actions/eventActions';

import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';

import NavigationBar from '../functional/NavigationBar';
import Row from 'react-bootstrap/Row';
import EventModal from '../functional/event/EventModal';
import CreateEventModal from '../functional/event/CreateEventModal';

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
    !this.props.token && this.props.history.push(`/`);
    this.props.getEvents(this.props.token);
    this.props.getCharacter(this.props.token);
  }

  toggleEventModal = () => {
    this.setState(state => ({
      showEvent: !state.showEvent
    }))
  }

  toggleCreateEventModal = () => {
    this.setState(state => ({
      showCreateEvent: !state.showCreateEvent
    }))
  }

  onSelectSlotHandler = slot => {
    if (this.props.user.profile.role === 'admin') {
      this.setState({date: slot.start})
      this.toggleCreateEventModal()
    }
  }

  onSelectEventHandler = event => {
    this.props.getSignups(this.props.token, event._id)
    .then(
      this.setState({event}),
      this.toggleEventModal()
    );
  }

  render() {
    return (
      <>
        <NavigationBar />
        <Row style={{justifyContent: 'center'}} >
          <EventModal 
            show={this.state.showEvent} 
            onHide={this.toggleEventModal}
            event={this.state.event}
          />
          <CreateEventModal
            show={this.state.showCreateEvent} 
            onHide={this.toggleCreateEventModal}
            date={this.state.date}
          />
          <Calendar
            views={{
              month: true,
              agenda: true,
            }}
            localizer={momentLocalizer(moment)} // Local time
            events={this.props.events}
            style={{height: 400, width: "80%"}}
            selectable={true} // Enables SelectSlotHandler
            onSelectSlot={this.onSelectSlotHandler} // Click a day from the grid
            onSelectEvent={this.onSelectEventHandler} // Click an event
          />
        </Row>
      </>
    );
  }
}

EventPage.propTypes = {
  user: PropTypes.object,
  character: PropTypes.object,
  events: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.user.token,
  events: state.event.events,
  character: state.character.main
});

export default connect(mapStateToProps,{getEvents, getSignups, getCharacter})(EventPage);