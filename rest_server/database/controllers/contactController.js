import Promise from 'bluebird';

import { Contact } from '../models/contact';

const addContact = (contactObj, id) => {
  const contact = Object.assign({}, contactObj, { UserId: id });

  return new Promise((resolve, reject) => {
    Contact.create(contact)
      .then(() => {
        resolve(`Contact added`);
      })
      .catch(err => {
        console.log(`Error creating contact. Error: ${err}`);
        reject(err);
      });
  });
};

const getAllContacts = (id) => {
  return new Promise((resolve, reject) => {
    Contact.findAll({ where: { UserId: id } })
      .then(contacts => {
        const contactList = [];
        for (let i = 0; i < contacts.length; i++) {
          contactList.push(contacts[i].dataValues);
        }
        resolve(contactList);
      })
      .catch(err => {
        console.log(`Error grabbing all Contacts for UserId: ${id}. Error: ${err}`);
        reject(err);
      });
  });
};

const updateContact = (contactObj, id) => {
  return new Promise((resolve, reject) => {
    Contact.update(contactObj, { where: { id } })
      .then(updated => {
        if (updated[0] === 0) {
          reject(Error(`Error finding Contact to update.`));
        } else {
          resolve(`Updated`);
        }
      })
      .catch(err => {
        console.log(`Error updating Contact. Error: ${err}`);
        reject(err);
      });
  });
};

const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    Contact.destroy({ where: { id } })
      .then(destroyed => {
        if (destroyed !== 1) {
          reject(Error(`Error deleting 1 contact`));
        } else {
          resolve(`Deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting contact. Error: ${err}`);
        reject(err);
      });
  });
};

export { addContact, getAllContacts, updateContact, deleteContact };
