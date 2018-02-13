import React, { Component } from 'react';
import axios from 'axios';

import ManageGroups from './manageGroups.jsx';

class ManageGroupsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addGroup: false,
      type: "",
      login: "",
      password: "",
      groupName: "",
    };
  }

  addGroup(groupObj) {
    const { refreshPage } = this.props;

    axios.post(`${process.env.REST_SERVER_URL}/api/signup`, groupObj)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error in addGroup. Error: ${err}`);
      });
  }

  setGroupName(text) {
    this.setState({
      groupName: text,
    });
  }

  setLogin(text) {
    this.setState({
      login: text,
    });
  }

  setPW(text) {
    this.setState({
      password: text,
    });
  }

  setType(text) {
    this.setState({
      type: text,
    });
  }

  toggleAddGroup() {
    const { addGroup } = this.state;

    this.setState({
      addGroup: !addGroup,
    });
  }

  render() {
    const { accounts, refreshPage } = this.props;
    const { addGroup, groupName, login, password, type } = this.state;

    return (
      <div>
        {
          addGroup && 
          <form>
            <input type="text" placeholder={'Login'} onChange={(e) => {this.setLogin(e.target.value)}} />
            <input type="text" placeholder={'Password'} onChange={(e) => {this.setPW(e.target.value)}} />
            <select onChange={(e) => {this.setType(e.target.value)}} >
              <option value="admin">Admin</option>
              <option value="group">Group</option>
            </select>
            <input type="text" placeholder={'Group Name'} onChange={(e) => {this.setGroupName(e.target.value)}} />
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              let isNew = true;

              if (type === 'admin') {
                isNew = false;
              }

              this.addGroup({ groupName, login, password, type, isNew });
            }}>ADD GROUP</button>
          </form>
        }
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.toggleAddGroup();
        }}>
          { addGroup ? 'CANCEL' : 'ADD GROUP' }
        </button>
        {
          accounts.map((account, i) => (
            <ManageGroups key={`account${i}`} account={account} refreshPage={refreshPage} />
          ))
        }
      </div>
    )
  }
}

export default ManageGroupsView;
