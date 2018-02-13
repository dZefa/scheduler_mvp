import React, { Component } from 'react';
import axios from 'axios';

import ManageRooms from './manageRooms.jsx';

class ManageRoomsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addRoom: false,
      name: '',
    }
  }

  addRoom(roomObj) {
    const { refreshPage } = this.props;

    axios.post(`${process.env.REST_SERVER_URL}/api/room`, roomObj)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error inside addRoom. Error: ${err}`);
      });
  }

  setRoomName(text) {
    this.setState({
      name: text,
    });
  }

  toggleAddRoom() {
    const { addRoom } = this.state;

    const stateChange = {
      addRoom: !addRoom,
    };

    if (addRoom) {
      stateChange.name = '';
    }

    this.setState(stateChange);
  }

  render() {
    const { rooms, refreshPage } = this.props;
    const { addRoom, name } = this.state;

    return(
      <div>
        { 
          addRoom &&
          <form>
            <input type="text" placeholder={'Room Name'} onChange={(e) => {this.setRoomName(e.target.value)}} />
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              this.addRoom({ name });
            }} >ADD ROOM</button>
          </form>
        }
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.toggleAddRoom();
        }}>
          { addRoom ? 'CANCEL' : 'ADD ROOM' }
        </button>
        {
          rooms.map((room, i) => (
            <ManageRooms key={`room-${i}`} room={room} refreshPage={refreshPage} />
          ))
        }
      </div>
    )
  }
};

export default ManageRoomsView;
