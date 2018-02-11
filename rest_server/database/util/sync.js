import { db } from '../index';
import { User } from '../models/user';

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
    })
    .catch(err => {
      console.log(`Error authenticating db. Error: ${err.message}`);
    });
};

export { syncDB };
