import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'datejs';

import { getAllRoomData } from '../../actions/roomActions';

import CalendarView from '../calendar/calendarView.jsx';
import Timeslot from './editTimeslot.jsx';
import RemoveTimeslot from './removeTimeslot.jsx';

class ManageTimeslot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTimeslots: [],
      timeslotsAdded: false,
      addTimeslot: false,
    };
    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    this.props.getRoomData();
    this.setState({
      addTimeslot: false,
    });
  }

  async updateRoom() {
    const { rooms, user } = this.props;
    const { timeslotsAdded, userTimeslots } = this.state;

    let timeslotStorage = [];

    if (!timeslotsAdded) {
      await rooms.forEach(room => {
        room.timeslots.forEach(timeslot => {
          if (timeslot.UserId === user.id && Date.compare(new Date(timeslot.end), new Date()) === 1) {
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

  componentDidMount() {
    this.updateRoom();
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
          <Timeslot refreshPage={this.refreshPage} user={user} rooms={rooms} />
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

const TimeslotDispatch = (dispatch) => {
  return {
    getRoomData: bindActionCreators(getAllRoomData, dispatch),
  }
};

export default connect(TimeslotState, TimeslotDispatch)(ManageTimeslot);
