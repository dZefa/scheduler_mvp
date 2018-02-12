import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePW = this.updatePW.bind(this);
  }

  updateUsername(text) {
    this.setState({
      username: text,
    });
  }

  updatePW(text) {
    this.setState({
      password: text,
    });
  }

  render() {
    const { actions, authorized } = this.props;
    const { username, password } = this.state;

    if (authorized) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div>
        <form>
          <input type="text" placeholder="Username" onChange={(e) => {this.updateUsername(e.target.value)}} />
          <input type="password" placeholder="Password" onChange={(e) => {this.updatePW(e.target.value)}} />
          <button type="submit" 
            onClick={(e) => {
              e.preventDefault();
              const userObj = {
                login: username,
                password: password
              };
              actions.authLogin(userObj);
            }}>
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
};

const LoginState = (state) => {
  return {
    authorized: state.auth.authorized,
  }
};

const LoginDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(LoginState, LoginDispatch)(LoginPage);
