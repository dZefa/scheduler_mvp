import React, { Component } from 'react';
import axios from 'axios';

class ManageRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readonly: true,
      name: this.props.room.name,
    };
  }

  deleteRoom(id) {
    const { refreshPage } = this.props;

    axios.delete(`${process.env.REST_SERVER_URL}/api/room/${id}`)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error inside deleteRoom. Error: ${err}`);
      });
  }

  setRoomName(text) {
    this.setState({
      name: text,
    });
  }

  toggleReadOnly() {
    const { readonly } = this.state;
    const { room } = this.props;

    const stateChange = {
      readonly: !readonly,
    };

    if (!readonly) {
      stateChange.name = room.name;
    }

    this.setState(stateChange);
  }

  updateRoom(id, roomObj) {
    const { refreshPage } = this.props;

    axios.put(`${process.env.REST_SERVER_URL}/api/room/${id}`, roomObj)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error inside updateRoom. Error: ${err}`);
      });
  }

  render() {
    const { room } = this.props;
    const { readonly, name } = this.state;

    return (
      <form>
        <input type="text" placeholder={`Name: ${room.name}`} readOnly={readonly} onChange={(e) => {this.setRoomName(e.target.value)}} />
          {
            !readonly &&
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              this.updateRoom(room.id, { name });
            }} >Submit Changes</button>
          }
          { 
            !readonly &&
            <button type="button" onClick={(e) => {
              e.preventDefault();
              this.deleteRoom(room.id);
            }} >DELETE</button>
          }
          <button type="button" onClick={(e) => {
            e.preventDefault();
            this.toggleReadOnly();
          }}>
            { readonly ? 'EDIT' : 'CANCEL' }
          </button>
      </form>
    )
  }
};

export default ManageRooms;
