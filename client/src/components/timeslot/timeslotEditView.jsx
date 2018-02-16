import React, { Component } from 'react';
import axios from 'axios';

import RemoveTimeslots from './removeTimeslot.jsx';
import Timeslot from './editTimeslot.jsx';

class TimeslotEditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTimeslot: false,
      allTimeslots: [],
    };

    this.toggleAddTimeslot = this.toggleAddTimeslot.bind(this);
    this.getAllTimeslots = this.getAllTimeslots.bind(this);
  }

  componentDidMount() {
    if (this.props.user.type === 'admin') {
      this.getAllTimeslots();
    }
  }

  getAllTimeslots() {
    axios.get(`${process.env.REST_SERVER_URL}/api/timeslot`)
      .then(({ data }) => {
        console.log('hi: ', data.result);
        this.setState({
          allTimeslots: data.result,
        });
      })
      .catch(err => {
        console.log(`Error inside getAllTimeslots. Error: ${err}`);
      });
  }

  toggleAddTimeslot() {
    const { addTimeslot } = this.state;

    this.setState({
      addTimeslot: !addTimeslot,
    });
  }

  render() {
    const { userTimeslots, user, roomData, refreshPage } = this.props;
    const { addTimeslot, allTimeslots } = this.state;

    return (
      <div>
        {
          user.type === 'group' && userTimeslots.length > 0 &&
          userTimeslots.map((timeslot, i) => {
            return <RemoveTimeslots key={`remove-${i}`} userTimeslot={timeslot} toggleAdd={this.toggleAddTimeslot} refreshPage={refreshPage} />
          })
        }
        {
          user.type === 'admin' && 
          allTimeslots.map((timeslot, i) => {
            return <RemoveTimeslots key={`remove-admin-${i}`} userTimeslot={timeslot} toggleAdd={this.toggleAddTimeslot} refreshPage={refreshPage} getAllTimeslots={this.getAllTimeslots} />
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
