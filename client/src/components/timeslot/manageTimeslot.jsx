import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'datejs';

import { getAllRoomData } from '../../actions/roomActions';
import { getUserTimeslots } from '../../actions/timeslotActions';

import CalendarView from '../calendar/calendarView.jsx';
import TimeslotEditView from './timeslotEditView.jsx';
import Loading from '../loading/loading.jsx';

class ManageTimeslot extends Component {
  constructor(props) {
    super(props);

    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    const { user, getRoomData, getUserTimeslot } = this.props;

    getRoomData();
    getUserTimeslot(user.id);
  }

  componentDidMount() {
    this.refreshPage();
  }

  closeTimeslots() {
    const { userTimeslots } = this.props;

    for (let i = 0; i < userTimeslots.length; i++) {
      if (Date.compare(Date.parse(userTimeslots[i].end).day(), Date.today().day()) === -1) {
        axios.put(`${process.env.REST_SERVER_URL}/api/timeslot/${userTimeslots[i].id}`, { finished: true })
          .then(success => {
            console.log(success);
          })
          .catch(err => {
            console.log(`Error inside closeTimeslots. Error: ${err}`);
          });
      }
    }
  }

  render() {
    const { userTimeslots, rooms, user, getUserTimeslot } = this.props;

    if (userTimeslots.length > 0) {
      this.closeTimeslots();
    }

    return (
      <div>
        <CalendarView roomData={rooms} view="day" />
        <TimeslotEditView getUserTimeslot={getUserTimeslot} user={user} userTimeslots={userTimeslots} roomData={rooms} refreshPage={this.refreshPage} />
      </div>
    )
  }
};

const TimeslotState = (state) => {
  return {
    rooms: state.room.roomData,
    user: state.auth.user,
    userTimeslots: state.timeslot.userTimeslots,
  }
};

const TimeslotDispatch = (dispatch) => {
  return {
    getRoomData: bindActionCreators(getAllRoomData, dispatch),
    getUserTimeslot : bindActionCreators(getUserTimeslots, dispatch),
  }
};

export default connect(TimeslotState, TimeslotDispatch)(ManageTimeslot);
