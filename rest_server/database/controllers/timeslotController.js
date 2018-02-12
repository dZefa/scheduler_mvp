import Promise from 'bluebird';

import { Timeslot } from '../models/timeslot';

const getTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({ where: { roomId: id, finished: false } })
      .then(timeslots => {
        const timeslotData = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotData.push(timeslots[i].dataValues);
        }
        resolve(timeslotData);
      })
      .catch(err => {
        console.log(`Error finding all Timeslots for Room: ${id}. Error: ${err}`);
        reject(err);
      });
  });
};

const addTimeslot = (timeObj) => {
  return new Promise((resolve, reject) => {
    Timeslot.create(timeObj)
      .then(() => {
        resolve(`Timeslot added`);
      })
      .catch(err => {
        console.log(`Error adding Timeslot. Error: ${err}`);
        reject(err);
      });
  });
};

const deleteTimeslot = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.destroy({ where: { id } })
      .then(deleted => {
        if (deleted === 0) {
          reject(Error(`Timeslot not found`));
        } else {
          resolve(`Timeslot cancelled`);
        }
      })
      .catch(err => {
        console.log(`Error deleting Timeslot. Error: ${err}`);
        reject(err);
      });
  });
};

const updateTimeslot = (timeObj) => {
  return new Promise((resolve, reject) => {
    Timeslot.update(timeObj, { where: { id: timeObj.id } })
      .then(updated => {
        if (update[0] === 0) {
          reject(Error(`Timeslot not found`));
        } else {
          resolve(`Timeslot Updated`)
        }
      })
      .catch(err => {
        console.log(`Error updating Timeslot. Error: ${err}`);
        reject(err);
      });
  });
};

export { getTimeslots, addTimeslot, deleteTimeslot, updateTimeslot };