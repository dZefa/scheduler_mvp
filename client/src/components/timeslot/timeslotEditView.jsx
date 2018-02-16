import React, { Component } from 'react';

import RemoveTimeslots from './removeTimeslot.jsx';
import Timeslot from './editTimeslot.jsx';

class TimeslotEditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTimeslot: false,
    };

    this.toggleAddTimeslot = this.toggleAddTimeslot.bind(this);
  }

  componentDidMount() {
    const { getUserTimeslot, user } = this.props;

    getUserTimeslot(user.id);
  }

  toggleAddTimeslot() {
    const { addTimeslot } = this.state;

    this.setState({
      addTimeslot: !addTimeslot,
    });
  }

  render() {
    const { userTimeslots, user, roomData, refreshPage } = this.props;
    const { addTimeslot } = this.state;

    return (
      <div>
        {
          userTimeslots.length > 0 &&
          userTimeslots.map((timeslot, i) => {
            return <RemoveTimeslots key={`remove-${i}`} userTimeslot={timeslot} toggleAdd={this.toggleAddTimeslot} refreshPage={refreshPage} />
          })
        }
        {
          addTimeslot &&
          <Timeslot refreshPage={refreshPage} user={user} rooms={roomData} toggleAdd={this.toggleAddTimeslot} />
        }
        {
          (user.type === "admin" || (user.type === "group" && userTimeslots.length === 0)) ?
          <button type="button" onClick={(e) => {
            e.preventDefault();
            this.toggleAddTimeslot();
          }}>{ !addTimeslot ? 'Add Timeslot' : 'Cancel' }</button> :
          <h1>you already have a reservation</h1>
        }
      </div>
    )
  }
};

export default TimeslotEditView