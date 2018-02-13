import React, { Component } from 'react';
import axios from 'axios';

import ContactView from './contactView.jsx';

class ManageGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addContacts: false,
      name: '',
      email: '',
      editGroup: false,
      login: this.props.account.name,
      password: this.props.account.password,
      groupName: this.props.account.groupName,
      type: this.props.account.type,
      isNew: this.props.account.isNew,
    };
  }

  addContact(contactObj) {
    const { account, refreshPage } = this.props;

    axios.post(`${process.env.REST_SERVER_URL}/api/contact/${account.id}`, contactObj)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error in addContact. Error: ${err}`);
      });
  }

  setEmail(text) {
    this.setState({
      email: text,
    });
  }

  setGroupName(text) {
    this.setState({
      groupName: text,
    });
  }

  setIsNew(bool) {
    this.setState({
      isNew: bool,
    });
  }

  setLogin(text) {
    this.setState({
      login: text,
    });
  }

  setName(text) {
    this.setState({
      name: text,
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

  toggleAddContacts() {
    const { addContacts } = this.state;

    this.setState({
      addContacts: !addContacts,
    });
  }

  toggleEditGroup() {
    const { editGroup } = this.state;
    const { account } = this.props;

    const stateChange = {
      editGroup: !editGroup,
    };

    if (editGroup) {
      stateChange.login = account.login;
      stateChange.password = account.password;
      stateChange.type = account.type;
      stateChange.isNew = account.isNew;
      stateChange.groupName = account.groupName;
    }

    this.setState({
      editGroup: !editGroup,
    });
  }

  render() {
    const { account, refreshPage } = this.props;
    const { addContacts, name, email, editGroup } = this.state;
    let adminSelect = false;
    let groupSelect = false;
    let isTrue = false;
    let isFalse = false;

    if (account.type === 'admin') {
      adminSelect = true;
    } else {
      groupSelect = true;
    }

    if (account.isNew) {
      isTrue = true;
    } else {
      isFalse = true;
    }

    return (
      <div>
        <h1>Group Name: { account.groupName !== null ? `${account.groupName}` : 'ADMIN' }</h1>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.toggleEditGroup();
        }}>{ editGroup ? 'CANCEL' : 'EDIT GROUP' }</button>
        {
          editGroup ?
          <form>
            <input type="text" placeholder={`Login: ${account.login}`} />
            <input type="text" placeholder={`Password: ${account.password}`} />
            <input type="text" placeholder={`Group Name: ${account.groupName}`} />
            <select onChange={(e) => {this.setType(e.target.value)}}>
              <option value="admin" selected={adminSelect}>Admin</option>
              <option value="group" selected={groupSelect}>Group</option>
            </select>
            <select onChange={(e) => {this.setIsNew(e.target.value)}}>
              <option value={true} selected={isTrue} >True</option>
              <option value={false} selected={isFalse} >False</option>
            </select>
            <button type="button" onClick={(e) => {
              e.preventDefault();
            }}>Submit</button>
          </form> :
          <div>
            <h2>CONTACT-LIST</h2>
            <div>
              {
                account.contacts.length > 0 ?
                account.contacts.map((contact, i) => (
                  <ContactView key={`contact${i}-${contact.name}_${account.groupName}`} contact={contact} refreshPage={refreshPage} />
                )) :
                <div>No Contacts Yet</div>
              }
              {
                addContacts ? 
                <form>
                  <input type="text" placeholder={'Name'} onChange={(e) => {this.setName(e.target.value)}} />
                  <input type="email" placeholder={'Email'} 
                    pattern=".+@+.com" title="Please enter a correct email address" 
                    onChange={(e) => {this.setEmail(e.target.value)}}
                  />
                  <button type="button" onClick={(e) => {
                    e.preventDefault();
                    this.addContact({ name, email });
                  }}>Add Contact</button>
                  <button type="button" onClick={(e) => {
                    e.preventDefault();
                    this.toggleAddContacts();
                  }}>Cancel</button>
                </form> :
                <button type="button" onClick={(e) => {
                  e.preventDefault();
                  this.toggleAddContacts();
                }}>Add Contact</button>
              }
            </div>
          </div>
        }
      </div>
    )
  }
};

export default ManageGroups;
