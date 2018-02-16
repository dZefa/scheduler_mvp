import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUser } from '../../actions/authActions';

import ContactsView from './groupContactsView.jsx';
import GroupView from './groupEditView.jsx';

class ManageViewGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, updateUser } = this.props;

    return (
      <div>
        <ContactsView user={user} />
        <GroupView user={user} updateUser={updateUser} />
      </div>
    )
  }
};

const ManageViewGroupState = (state) => {
  return {
    user: state.auth.user,
  }
};

const ManageViewGroupDispatch = (dispatch) => {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
  }
};

export default connect(ManageViewGroupState, ManageViewGroupDispatch)(ManageViewGroup);
