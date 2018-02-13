import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ContactView from '../manage/manageGroups/contactView.jsx';
import Loading from '../loading/loading.jsx';

class GroupContactsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      refreshed: false,
      addContact: false,
      name: '',
      email: '',
      gotContacts: false,
    };

    this.refreshView = this.refreshView.bind(this);
  }

  addContactInfo(contactObj) {
    axios.post(`${process.env.REST_SERVER_URL}/api/contact/${contactObj.UserId}`, contactObj)
      .then(success => {
        this.refreshView();
      })
      .catch(err => {
        console.log(`Error inside addContactInfo. Error: ${err}`);
      });
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
        this.setState({
          contacts: data.result,
          gotContacts: true,
        });
      })
      .catch(err => {
        console.log(`Error inside of getContacts. Error: ${err}`);
      });
  }

  refreshView() {
    const { refreshed, name, email, addContact } = this.state;

    this.setState({
      refreshed: false,
      name: '',
      email: '',
      addContact: false,
    });

    this.componentDidMount();
  }

  setEmail(text) {
    this.setState({
      email: text,
    });
  }

  setName(text) {
    this.setState({
      name: text,
    });
  }

  toggleAddContact() {
    const { addContact } = this.state;

    const stateChange = {
      addContact: !addContact,
    };

    if (addContact) {
      stateChange.name = '';
      stateChange.email = '';
    }

    this.setState(stateChange);
  }

  updateIsNew(id) {
    axios.put(`${process.env.REST_SERVER_URL}/api/login/${id}`, { isNew: false })
      .then(success => {
        console.log(`Group id, ${id}, is no longer new!`);
      })
      .catch(err => {
        console.log(`Error inside updateIsNew. Error: ${err}`);
      });
  }

  render() {
    const { user } = this.props;
    const { gotContacts, contacts, addContact, name, email } = this.state;

    if (user.isNew) {
      user.isNew = false;
      this.updateIsNew(user.id);
    }

    if (!gotContacts) {
      return (
        <Loading />
      )
    }

    return (
      <div>
        {
          contacts.map((contact, i) => (
            <ContactView key={`group-contact-${i}`} contact={contact} refreshPage={this.refreshView} />
          ))
        }
        {
          addContact && 
          <form>
            <input type="text" placeholder={'Full Name'} onChange={(e) => {this.setName(e.target.value)}} />
            <input type="text" placeholder={'Email'} onChange={(e) => {this.setEmail(e.target.value)}} />
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              this.addContactInfo({ name, email, UserId: user.id });
            }} >Submit</button>
          </form>
        }
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.toggleAddContact();
        }}>{ addContact ? 'CANCEL' : 'ADD CONTACT' }</button>
      </div>
    )
  }
};

const GroupContactsState = (state) => {
  return {
    user: state.auth.user,
  }
};

export default connect(GroupContactsState)(GroupContactsView);
