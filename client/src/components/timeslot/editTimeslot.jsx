import React, { Component } from 'react';
import axios from 'axios';

class Timeslot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startArr: [],
      endArr: [],
      startSelected: false,
      endSelected: false,
      startTime: null,
      endTime: null,
      title: '',
      room: 0,
    };
  }

  addTimeslot(timeslotObj) {
    const { refreshPage } = this.props;

    axios.post(`${process.env.REST_SERVER_URL}/api/timeslot`, timeslotObj)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error inside addTimeSlot. Error: ${err}`);
      });
  }

  checkAndSetOptionTime(str) {
    let hourAndTime = str.split(':');
    let changed = false;

    if (Number(hourAndTime[0]) > 12) {
      hourAndTime[0] = (Number(hourAndTime[0]) - 12).toString();
      changed = true;
    }

    return changed ? hourAndTime.join(':') + ' PM' : hourAndTime.join(':') + ' AM';
  }

  componentDidMount() {
    this.setStartArr();
  }

  setEndArr(startTime) {
    const { endArr } = this.state;

    const endTime = [];

    const currDay = Date.today().toString('M/d/yyyy');
    
    endTime.push({ date: Date.parse(startTime).add(1).hour(), option: currDay + ' ' + this.checkAndSetOptionTime(Date.parse(startTime).add(1).hour().toString('HH:mm')) });
    endTime.push({ date: Date.parse(startTime).add(2).hour(), option: currDay + ' ' + this.checkAndSetOptionTime(Date.parse(startTime).add(2).hour().toString('HH:mm')) });

    this.setState({
      endArr: [...endTime],
    });
  }

  setEndTime(text) {
    this.setState({
      endTime: Date.parse(text),
    });
  }

  setRoom(val) {
    this.setState({
      room: val,
    });
  }

  setStartArr() {
    const { startArr } = this.state;

    const currDay = Date.today().toString('M/d/yyyy');
    let currHour = Date.today().setTimeToNow().getHours();
    let count = 0;
    const startTime = [];

    while(currHour < 19) {
      count += 1;
      startTime.push({ date: Date.today().setTimeToNow().add(count).hour().set({ second: 0, millisecond: 0, minute: 0 }), option: currDay + ' ' + this.checkAndSetOptionTime(Date.today().setTimeToNow().add(count).hour().set({ second: 0, millisecond: 0, minute: 0 }).toString('HH:mm')) });
      if (currHour !== 18) {
        startTime.push({ date: Date.today().setTimeToNow().add(count).hour().set({ second: 0, millisecond: 0, minute: 30 }), option: currDay + ' ' + this.checkAndSetOptionTime(Date.today().setTimeToNow().add(count).hour().set({ second: 0, millisecond: 0, minute: 30 }).toString('HH:mm')) });
      }
      currHour = Date.today().setTimeToNow().add(count).hour().getHours();
    }

    this.setState({
      startArr: [...startTime],
    });
  }

  setStartTime(text) {
    this.setState({
      startTime: Date.parse(text),
    });
  }

  setTitle(text) {
    this.setState({
      title: text,
    });
  }

  render() {
    const { startArr, startSelected, endSelected, endArr, title, startTime, endTime, room } = this.state;
    const { user, rooms, toggleAdd } = this.props;

    return (
      <form>
        <input type="text" placeholder="Group Name or Title" onChange={(e) => {this.setTitle(e.target.value)}}  />
        <select defaultValue={"ex"} onChange={(e) => {
          this.setRoom(e.target.value);
        }}>
          <option value="ex" disabled>Select Room</option>
        {
          rooms.map((room, i) => {
            return <option key={`room-opt-${i}`} value={room.id} >{room.name}</option>
          })
        }
        </select>
        <select defaultValue={"ex"} onChange={(e) => {
          this.setEndArr(e.target.value);
          !startSelected && this.setState({ startSelected: true });
          this.setStartTime(e.target.value);
        }} >
          <option value="ex" disabled>Select Start Time</option>
          {
            startArr.map((start, i) => {
              return <option key={`start-opt-${i}`} value={start.date}>{start.option}</option>
            })
          }
        </select>
        {
          startSelected && 
          <select defaultValue={"ex"} onChange={(e) => {
            !endSelected && this.setState({ endSelected: true });
            this.setEndTime(e.target.value);
          }}>
            <option value="ex" disabled>Select End Time</option>
            {
              endArr.map((end, i) => {
                return <option key={`end-opt-${i}`} value={end.date}>{end.option}</option>
              })
            }
          </select>
        }
        {
          endSelected && 
          (title !== '' ?
          <button type="button" onClick={(e) => {
            toggleAdd();
            this.addTimeslot({ UserId: user.id, title: `${user.groupName} ` + title, start: startTime, end: endTime, RoomId: room });
          }}>Schedule Timeslot</button> :
          <h1>Please enter your GroupName in the first input</h1>)
        }
      </form>
    )
  }
};

export default Timeslot;