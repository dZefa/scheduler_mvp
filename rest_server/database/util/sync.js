import { db } from '../index';
import { User } from '../models/user';
import { Room } from '../models/room';
import { Timeslot } from '../models/timeslot';

const syncDB = (bool=false) => {
  db.authenticate()
    .then(() => {
      console.log(`DB authenticated`);
      User.sync({ force: bool })
        .then(() => {
          console.log(`User table synced`);
        })
        .catch(err => {
          console.log(`Error syncing User table. Error: ${err.message}`)
        });
      Room.sync({ force: bool })
        .then(() => {
          console.log(`Room table synced`);
          Timeslot.sync({ force: bool })
            .then(() => {
              console.log(`Timeslot table synced`);
            })
            .catch(err => {
              console.log(`Error syncing Timeslot table. Error: ${err.message}`);
            });
        })
        .catch(err => {
          console.log(`Error syncing Room table. Error: ${err.message}`);
        })
    })
    .catch(err => {
      console.log(`Error authenticating db. Error: ${err.message}`);
    });
};

export { syncDB };
