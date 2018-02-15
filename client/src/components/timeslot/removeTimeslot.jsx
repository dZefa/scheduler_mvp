import React, { Component } from 'react';
import axios from 'axios';

class RemoveTimeslotsView extends Component {
  constructor(props) {
    super(props);
  }

  deleteTimeslot(id) {
    const { refreshPage } = this.props;

    axios.delete(`${process.env.REST_SERVER_URL}/api/timeslot/${id}`)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error inside deleteTimeslot. Error: ${err}`);
      });
  }

  render() {
    const { userTimeslot } = this.props;

    return (
      <div>
        <input value={`Timeslot: ${userTimeslot.title} ${userTimeslot.start} - ${userTimeslot.end}`} disabled={true}/>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.deleteTimeslot(userTimeslot.id);
        }} >Cancel Reservation</button>
      </div>
    )
  }
};

export default RemoveTimeslotsView;
