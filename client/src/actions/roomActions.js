import axios from 'axios';

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

export { getAllRoomData };
