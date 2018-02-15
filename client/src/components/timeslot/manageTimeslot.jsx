import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'datejs';

import * as roomActions from '../../actions/roomActions';

import CalendarView from '../calendar/calendarView.jsx';
import TimeslotEditView from './timeslotEditView.jsx';
import Loading from '../loading/loading.jsx';

class ManageTimeslot extends Component {
  constructor(props) {
    super(props);

    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    this.props.actions.getAllRoomData();
  }
  
  render() {
    const { userTimeslots, rooms, user, actions } = this.props;

    return (
      <div>
        <CalendarView roomData={rooms} view="day" />
        <TimeslotEditView getRoomData={actions.setUserRoomData} roomData={rooms} user={user} userTimeslots={userTimeslots} refreshPage={this.refreshPage} />
      </div>
    )
  }
};

const TimeslotState = (state) => {
  return {
    rooms: state.room.roomData,
    user: state.auth.user,
    userTimeslots: state.room.userRoomData,
  }
};

const TimeslotDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(roomActions, dispatch),
  }
};

export default connect(TimeslotState, TimeslotDispatch)(ManageTimeslot);
