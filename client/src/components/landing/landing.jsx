import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAllRoomData } from '../../actions/roomActions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getRoomData, roomData } = this.props;

    if (roomData.length === 0) {
      getRoomData();
    }
  }

  render() {
    const { roomData } = this.props;

    return (
      <div>
        Landing
      </div>
    )
  }
};

const LandingState = (state) => {
  return {
    roomData: state.room.roomData,
  }
};

const LandingDispatch = (dispatch) => {
  return {
    getRoomData: bindActionCreators(getAllRoomData, dispatch),
  }
};

export default connect(LandingState, LandingDispatch)(LandingPage);
