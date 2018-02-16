const initialState = {
  user: {},
  authorized: false,
}

const authReducer = (state=initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return Object.assign({}, state, {
        user: payload,
        authorized: true,
      });
    }
    case 'LOGIN_FAILED': {
      return Object.assign({}, state, {
        authorized: false,
      });
    }
    case 'LOGOUT': {
      return Object.assign({}, state, {
        user: {},
        authorized: false,
      });
    }
    case 'USER_UPDATE_GET_SUCCESS': {
      return Object.assign({}, state, {
        user: payload,
      });
    }
    case 'USER_UPDATE_GET_FAILED': {
      return Object.assign({}, state);
    }
    default : {
      return state;
    }
  }
};

export { authReducer };
