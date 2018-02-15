const initialState = {
  roomData: [],
  failed: false,
  userRoomData: [],
};

const roomReducer = (state=initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'ROOM_DATA_SUCCESS': {
      return Object.assign({}, state, {
        roomData: payload,
      });
    }
    case 'ROOM_DATA_FAILED': {
      return Object.assign({}, state, {
        failed: true,
      });
    }
    case 'USER_ROOM_DATA_SUCCESS': {
      return Object.assign({}, state, {
        userRoomData: payload,
      });
    }
    default : {
      return state;
    }
  };
};

export { roomReducer };
