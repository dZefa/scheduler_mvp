import Promise from 'bluebird';

import { Room } from '../models/room';

const addRoom = (name) => {
  return new Promise((resolve, reject) => {
    Room.create({ name })
      .then(() => {
        resolve(`Room Created`);
      })
      .catch(err => {
        console.log(`Error creating Room. Error: ${err}`);
        reject(err);
      });
  });
};

const deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    Room.destroy({ where: { id } })
      .then(deleted => {
        if (deleted === 0) {
          reject(Error(`Room id not found`));
        } else {
          resolve(`Deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting Room. Error: ${err}`);
        reject(err);
      });
  });
};

const updateRoom = (id) => {
  return new Promise((resolve, reject) => {
    Room.update({ name }, { where: { id }})
      .then((updated) => {
        if (updated[0] === 0) {
          reject(Error(`Room id not found`));
        } else {
          resolve(`Updated`);
        }
      })
      .catch(err => {
        console.log(`Error updating Room. Error: ${err}`);
        reject(err);
      });
  });
};

export { addRoom, deleteRoom, updateRoom };