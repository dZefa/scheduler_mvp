import Promise from 'bluebird';

import { Timeslot } from '../models/timeslot';

const getTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({ where: { roomId: id } })
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

export { getTimeslots };
