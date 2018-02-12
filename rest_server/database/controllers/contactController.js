import Promise from 'bluebird';

import { Contact } from '../models/contact';

const addContact = (contactObj, id) => {
  const contact = Object.assign({}, contactObj, { userId: id });

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
    Contact.findAll({ where: { userId: id } })
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

export { addContact, getAllContacts };
