import axios from 'axios';

const getUserTimeslots = (id) => (dispatch) => {
  axios.get(`${process.env.REST_SERVER_URL}/api/timeslot/${id}`)
    .then(({ data }) => {
      dispatch({ type: 'USER_TIMESLOT_SUCCESS', payload: data.result });
    })
    .catch(err => {
      dispatch({ type: 'USER_TIMESLOT_FAILED' });
    });
};

export { getUserTimeslots };
