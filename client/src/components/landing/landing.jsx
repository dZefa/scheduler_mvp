import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getAllRoomData } from '../../actions/roomActions';

import CalendarView from '../calendar/calendarView.jsx';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getRoomData, roomData } = this.props;

    getRoomData();
  }

  render() {
    const { roomData, authorized, user } = this.props;

    if (authorized && user.type === 'group' && user.isNew) {
      return (
        <Redirect to="/contacts" />
      )
    }

    return (
      <div>
        <CalendarView roomData={roomData} />
      </div>
    )
  }
};

const LandingState = (state) => {
  return {
    roomData: state.room.roomData,
    user: state.auth.user,
    authorized: state.auth.authorized,
  }
};

const LandingDispatch = (dispatch) => {
  return {
    getRoomData: bindActionCreators(getAllRoomData, dispatch),
  }
};

export default connect(LandingState, LandingDispatch)(LandingPage);
