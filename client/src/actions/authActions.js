import axios from 'axios';
import { push } from 'react-router-redux'

const REST_SERVER_URL = process.env.REST_SERVER_URL;

const authLogin = (loginObj) => (dispatch) => {
  axios.post(`${REST_SERVER_URL}/api/login`, loginObj)
    .then(data => {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data.result });
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_FAILED' });
    });
};

const authLogout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  dispatch(push('/'));
};

export { authLogin, authLogout };
