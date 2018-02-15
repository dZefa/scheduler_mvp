import axios from 'axios';
import Promise from 'bluebird';
import 'datejs';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

const getAllRoomData = () => (dispatch) => {
  axios.get(`${REST_SERVER_URL}/api/room`)
    .then((roomData) => {
      dispatch({ type: 'ROOM_DATA_SUCCESS', payload: roomData.data.result });
    })
    .catch((err) => {
      dispatch({ type: 'ROOM_DATA_FAILED' });
    });
};

const setUserRoomData = (roomData, userId) => (dispatch) => {
  const roomFiltered = [];

  for (let i = 0; i < roomData.length; i++) {
    for (let j = 0; j < roomData[i].timeslots.length; j++) {
      const timeslot = roomData[i].timeslots[j];
      if (timeslot.UserId === userId && Date.compare(Date.parse(timeslot.end), Date.today()) === 1) {
        roomFiltered.push(timeslot);
      }
    }
  }
  
    dispatch({ type: 'USER_ROOM_DATA_SUCCESS', payload: roomFiltered });
};

export { getAllRoomData, setUserRoomData };
