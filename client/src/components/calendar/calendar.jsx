import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class CalendarTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { roomInfo, view } = this.props;

    roomInfo.timeslots.forEach(timeslot => {
      timeslot.start = new Date(timeslot.start);
      timeslot.end = new Date(timeslot.end);
    });

    return (
      <div>
        <h1>{roomInfo.name}</h1>
        <BigCalendar
          events={roomInfo.timeslots}
          step={15}
          timeslots={8}
          defaultView={view}
          views={['week', 'day']}
          min={new Date('2018-02-12T16:00:00.113Z')}
          max={new Date('2018-02-13T05:00:00.113Z')}
          toolbar={false}
        />
      </div>
    )
  }
};

export default CalendarTab;
