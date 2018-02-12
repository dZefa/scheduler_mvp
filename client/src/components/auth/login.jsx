import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import * as authActions from '../../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, authorized } = this.props;

    if (authorized) {
      push('/');
      return (
        <div>Already Logged In</div>
      );
    }

    return (
      <div>LOGIN PAGE</div>
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
