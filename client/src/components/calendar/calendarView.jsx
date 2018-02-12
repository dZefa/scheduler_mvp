import React, { Component } from 'react';

import CalendarTab from './calendar.jsx';
import Loading from '../loading/loading.jsx';

class CalendarView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { roomData } = this.props;

    if ( roomData.length === 0) {
      return (
        <Loading />
      )
    } 

    return (
      <div>
        {
          roomData.map((room, i) => {
            return <CalendarTab key={`${room.name + i}`} roomInfo={room} />;
          })
        }
      </div>
    )
  }
};

export default CalendarView;
