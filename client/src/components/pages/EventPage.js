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

  render() {
    const toggleEventModal = () => {
      this.setState(state => ({
        showEvent: !state.showEvent
      }))
    }

    const toggleCreateEventModal = () => {
      this.setState(state => ({
        showCreateEvent: !state.showCreateEvent
      }))
    }

    const onSelectSlotHandler = slot => {
      if (this.props.user.profile.role === 'admin') {
        this.setState({date: slot.start})
        toggleCreateEventModal()
      }
    }

    const onSelectEventHandler = event => {
      getSignups(this.props.token, event._id)
      .then(signups => {
        this.setState({event, signups})
        toggleEventModal()
      })
    }

    return (
      <>
        <NavigationBar />
        <Row style={{justifyContent: 'center'}} >
          <EventModal 
            show={this.state.showEvent} 
            onHide={toggleEventModal}
            event={this.state.event}
            token={this.props.token}
            character={this.props.character}
            signups={this.state.signups}
          />
          <CreateEventModal
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
            localizer={momentLocalizer(moment)} // Local time
            events={this.props.events}
            style={{height: 400, width: "80%"}}
            selectable={true} // Enables SelectSlotHandler
            onSelectSlot={onSelectSlotHandler} // Click a day from the grid
            onSelectEvent={onSelectEventHandler} // Click an event
          />
        </Row>
      </>
    );
  }
}

EventPage.propTypes = {
  user: PropTypes.object,
  character: PropTypes.object,
  events: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.user.token,
  events: state.event.events,
  character: state.character.main
});

export default connect(mapStateToProps,{getEvents, getCharacter})(EventPage);