import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageTimeslot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Timeslots</div>
    )
  }
};

const TimeslotState = (state) => {
  return {
    rooms: state.room.roomData,
  }
}

export default connect()(ManageTimeslot);
