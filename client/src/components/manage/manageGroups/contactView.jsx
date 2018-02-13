import React, { Component } from 'react';
import axios from 'axios';

class ContactView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readonly: true,
      name: this.props.contact.name,
      email: this.props.contact.email,
    };
  }

  deleteContact(id) {
    const { refreshPage } = this.props;

    axios.delete(`${process.env.REST_SERVER_URL}/api/contact/${id}`)
      .then(success => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error in deleteContact. Error: ${err}`);
      });
  }

  submitEdit(contactObj) {
    const { contact, refreshPage } = this.props;
    const { name, email } = this.state;

    axios.put(`${process.env.REST_SERVER_URL}/api/contact/${contact.id}`, { name, email })
      .then((success) => {
        refreshPage();
      })
      .catch(err => {
        console.log(`Error updating contact. Error: ${err}`);
      });
  }

  toggleEdit() {
    const { readonly } = this.state;
    const { contact } = this.props;

    const stateChange = {
      readonly: !readonly,
    };

    if (!readonly) {
      stateChange.name = contact.name;
      stateChange.email = contact.email;
    }

    this.setState(stateChange);
  }

  updateEmail(text) {
    this.setState({
      email: text,
    });
  }
  
  updateName(text) {
    this.setState({
      name: text,
    });
  }

  render() {
    const { contact } = this.props;
    const { readonly, name, email } = this.state;

    return (
      <form>
        <input type="text" placeholder={`Name: ${contact.name}`} readOnly={readonly} onChange={(e) => {this.updateName(e.target.value)}} />
        <input type="email" placeholder={`Email: ${contact.email}`} pattern={`.+@+.com`} readOnly={readonly} onChange={(e) => {this.updateEmail(e.target.value)}} />
        { !readonly &&
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            this.submitEdit({
              id: contact.id,
              name,
              email,
            })
          }}>UPDATE</button>
        }
        { !readonly &&
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            this.deleteContact(contact.id);
          }}>DELETE</button>
        }
        <button type="button" onClick={(e) => {
          e.preventDefault();
          this.toggleEdit();
        }}>
          { readonly ? 'EDIT' : 'CANCEL' }
        </button>
      </form>
    )
  }
};

export default ContactView;
