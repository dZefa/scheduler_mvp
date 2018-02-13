import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ContactView from '../manage/manageGroups/contactView.jsx';

class GroupContactsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      refreshed: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const { contacts, refreshed } = this.state;

    if (!refreshed) {
      this.getContacts(user.id);
      this.setState({
        refreshed: true,
      });
    }
  }

  getContacts(id) {
    axios.get(`${process.env.REST_SERVER_URL}/api/contact/${id}`)
      .then(({ data }) => {
        console.log(`data: ${data}`)
        this.setState({
          contacts: data.result,
        });
      })
      .catch(err => {
        console.log(`Error inside of getContacts. Error: ${err}`);
      });
  }

  render() {
    const { user } = this.props;
    const { contacts } = this.state;

    console.log(user);
    console.log(contacts);

    return (
      <div>Contacts view</div>
    )
  }
};

const GroupContactsState = (state) => {
  return {
    user: state.auth.user,
  }
};

export default connect(GroupContactsState)(GroupContactsView);
