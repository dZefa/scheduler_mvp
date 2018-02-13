import React, { Component } from 'react';
import { connect } from 'react-redux';

import CalendarView from '../calendar/calendarView.jsx';

class ManageTimeslot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTimeslots: [],
      timeslotsAdded: false,
      addTimeslot: false,
    };
  }

  async componentDidMount() {
    const { rooms, user } = this.props;
    const { timeslotsAdded, userTimeslots } = this.state;

    let timeslotStorage = [];

    if (!timeslotsAdded) {
      await rooms.forEach(room => {
        room.timeslots.forEach(timeslot => {
          if (timeslot.UserId === user.id && new Date(timeslot.end) > new Date()) {
            timeslotStorage.push(timeslot);
          }
        });
      });
      this.setState({
        timeslotsAdded: true,
        userTimeslots: [...timeslotStorage]
      });
    }
  }

  toggleAddTimeslot() {
    const { addTimeslot } = this.state;

    this.setState({
      addTimeslot: !addTimeslot,
    });
  }

  render() {
    const { rooms, user } = this.props;
    const { userTimeslots, addTimeslot } = this.state;

    return (
      <div>
        <CalendarView roomData={rooms} view="day" />
        {
          addTimeslot &&
          <div>HI</div>
        }
        {
          (user.type === "admin" || (user.type === "group" && userTimeslots.length === 0)) ?
          <button type="button" onClick={(e) => {
            e.preventDefault();
            this.toggleAddTimeslot();
          }}>{ !addTimeslot ? 'Add Timeslot' : 'Cancel' }</button> :
          null
        }
      </div>
    )
  }
};

const TimeslotState = (state) => {
  return {
    rooms: state.room.roomData,
    user: state.auth.user,
  }
};

export default connect(TimeslotState)(ManageTimeslot);
