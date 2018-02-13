import React, { Component } from 'react';

import CalendarTab from './calendar.jsx';
import Loading from '../loading/loading.jsx';

class CalendarView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { roomData, view } = this.props;
    let defaultView = '';

    if (view === undefined) {
      defaultView = 'week';
    } else {
      defaultView = view;
    }

    if (roomData.length === 0) {
      return (
        <Loading />
      )
    } 

    return (
      <div>
        {
          roomData.map((room, i) => {
            return <CalendarTab key={`${room.name + i}`} roomInfo={room} view={defaultView} />;
          })
        }
      </div>
    )
  }
};

export default CalendarView;
