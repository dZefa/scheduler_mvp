import React, { Component } from 'react';
import axios from 'axios';

class GroupEditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableGroupName: true,
      groupName: '',
    }
  }

  setGroupName(text) {
    this.setState({
      groupName: text,
    });
  }

  setDisable() {
    const { disableGroupName } = this.state;

    this.setState({
      disableGroupName: !disableGroupName,
    });
  }

  updateGroup(userObj, id) {
    const { updateUser } = this.props;

    axios.put(`${process.env.REST_SERVER_URL}/api/login/${id}`, userObj)
      .then(success => {
        updateUser(id);
      })
      .catch(err => {
        console.log(`Error inside updateGroup. Error: ${err}`);
      });
  }

  render() {
    const { disableGroupName, groupName } = this.state;
    const { user } = this.props;

    return (
      <div>
        <form>
          <input type="text" placeholder={`Group Name: ${user.groupName}`} onChange={(e) => {this.setGroupName(e.target.value)}} disabled={disableGroupName} />
          {
            !disableGroupName &&
            <button type="button" onClick={(e) => {
              e.preventDefault();
              this.updateGroup({ groupName }, user.id);
              this.setDisable();
            }} >Submit Changes</button>
          }
          <button type="button" onClick={(e) => {
            e.preventDefault();
            this.setDisable();
          }} >{ disableGroupName ? 'EDIT GROUP NAME' : 'CANCEL' }</button>
        </form>
      </div>
    )
  }
};

export default GroupEditView;
