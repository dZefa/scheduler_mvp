import React, { Component } from 'react';

import CalendarTab from './calendar.jsx';
import Loading from '../loading/loading.jsx';

class CalendarView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { roomData, view, toolbar } = this.props;
    let defaultView = '';
    let toolbarBool = false;

    if (view === undefined) {
      defaultView = 'week';
    } else {
      defaultView = view;
    }

    if (toolbar !== undefined) {
      toolbarBool = toolbar;
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
            return <CalendarTab key={`${room.name + i}`} roomInfo={room} view={defaultView} toolbar={toolbarBool} />;
          })
        }
      </div>
    )
  }
};

export default CalendarView;
