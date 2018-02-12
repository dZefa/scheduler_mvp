import Promise from 'bluebird';

import { User } from '../models/user';

const getPW = (login) => {
  return new Promise((resolve, reject) => {
  
    User.findOne({ where: { login } })
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        console.log(`Error finding login. Error: ${err}`);
        reject(err);
      });
  });
};

const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    User.create(userObj)
      .then(() => {
        resolve(`User Created`);
      })
      .catch(err => {
        console.log(`Error creating login. Error: ${err}`);
        reject(err);
      });
  });
};

const updateUser = (userObj) => {
  return new Promise((resolve, reject) => {
    User.update(userObj, 
      { where: { login: userObj.login }
    })
      .then((updated) => {
        if (updated[0] === 0) {
          reject(Error(`Login not found`));
        } else {
          resolve(`Updated!`);
        }
      })
      .catch(err => {
        reject(`Error updating login. Error: ${err}`);
      });
  });
};

export { getPW, createUser, updateUser };
