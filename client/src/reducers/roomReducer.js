const initialState = {
  roomData: [],
  failed: false,
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
    default : {
      return state;
    }
  };
};

export { roomReducer };
