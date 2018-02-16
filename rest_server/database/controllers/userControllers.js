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

const updateUser = (userObj, id) => {
  return new Promise((resolve, reject) => {
    User.update(userObj, 
      { where: { id }
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

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then(users => {
        const userArr = [];
        for (let i = 0; i < users.length; i++) {
          userArr.push(users[i].dataValues);
        }
        resolve(userArr);
      })
      .catch(err => {
        console.log(`Error grabbing all Users. Error: ${err}`);
        reject(err);
      });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.destroy({ where: { id } })
      .then(destroyed => {
        if (destroyed !== 1) {
          reject(Error(`Error finding User to delete`));
        } else {
          resolve(`User deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting user. Error: ${err}`);
        reject(err);
      });
  });
};

const getSingleUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id } })
      .then(user => {
        resolve(user.dataValues);
      })
      .catch(err => {
        console.log(`Error grabbing userId: ${id}. Error: ${err}`);
      });
  });
};

export { getPW, createUser, updateUser, getAllUsers, deleteUser, getSingleUser };
