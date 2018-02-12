import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';

class CalanderTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { roomInfo } = this.props;

    roomInfo.timeslots.forEach(timeslot => {
      timeslot.start = new Date(timeslot.start);
      timeslot.end = new Date(timeslot.end);
    });

    return (
      <div>
        <BigCalendar
          events={roomInfo.timeslots}
          step={15}
          timeslots={8}
          defaultView="week"
        />
      </div>
    )
  }
};

export default CalanderTab;
