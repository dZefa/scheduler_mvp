const initialState = {
  userTimeslots: [],
};

const TimeslotReducer = (state=initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'USER_TIMESLOT_SUCCESS': {
      return Object.assign({}, state, {
        userTimeslots: payload,
      });
    }
    case 'USER_TIMESLOT_FAILED': {
      return Object.assign({}, state, {
        userTimeslots: [],
      });
    }
    default: {
      return state;
    }
  }
};

export { TimeslotReducer };
