import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Loading from '../loading/loading.jsx';

class ManageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      adminContacts: [],
      rooms: [],
      refreshed: false,
    };

    this.getAccounts = this.getAccounts.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    const { accounts, refreshed } = this.state;

    if (!refreshed) {
      this.getAccounts();
      this.getRooms();
      this.setState({
        refreshed: true,
      });
    }
  }

  getAccounts() {
    axios.get(`${process.env.REST_SERVER_URL}/api/login`)
      .then(({ data }) => {
        this.setState({
          accounts: data.result,
        });
      })
      .catch(err => {
        console.log(`ERROR in getaccounts. Error: ${err}`);
      });
  }

  getRooms() {
    axios.get(`${process.env.REST_SERVER_URL}/api/rooms`)
      .then(({ data }) => {
        this.setState({
          rooms: data.result,
        });
      })
      .catch(err => {
        console.log(`Error in getRooms. Error: ${err}`);
      });
  }

  render() {
    const { type } = this.props;
    const { accounts, adminContacts, rooms, refreshed } = this.state;

    if (type !== 'admin') {
      return (
        <Redirect to="/" />
      )
    }

    if (accounts.length > 0 && rooms.length > 0 && refreshed) {
      return (
        <div>Manage View</div>
      )
    }

    return (
      <Loading />
    )
  }
};

const ManageViewState = (state) => {
  return {
    type: state.auth.user.type,
  }
};

export default connect(ManageViewState)(ManageView);
