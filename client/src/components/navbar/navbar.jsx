import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { authLogout } from '../../actions/authActions';

import AdminNav from './adminNav.jsx';
import GroupNav from './groupNav.jsx';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authorized, logout, type } = this.props;

    return (
      <div>
        <Link to="/">HOME</Link>
        { !authorized && <Link to="/login" >LOGIN</Link> }
        { authorized && type === 'admin' && <AdminNav /> }
        { authorized && type === 'group' && <GroupNav /> }
        { authorized && <Link to="/timeslots">Timeslots</Link> }
        { authorized && 
          <div onClick={(e) => {
            e.preventDefault();
            logout();
          }}>LOGOUT</div>
        }
      </div>
    )
  }
};

const NavState = (state) => {
  return {
    authorized: state.auth.authorized,
    type: state.auth.user.type,
  }
};

const NavDispatch = (dispatch) => {
  return {
    logout: bindActionCreators(authLogout, dispatch),
  }
};

export default connect(NavState, NavDispatch)(Navbar);
