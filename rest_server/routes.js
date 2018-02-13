import express from 'express';

import { getLogins, checkLogin, createLogin, updateLogin, createContact, getContacts } from './controllers/accountController';
import { createRoom, removeRoom, updateRoom, getAllRoomTimeslots, getAllRooms } from './controllers/roomController';
import { scheduleTimeslot, cancelTimeslot, updateTimeslotInfo } from './controllers/timeslotController';

const Router = express.Router();

Router.route('/login')
  .get(getLogins)
  .post(checkLogin)
  .put(updateLogin);

Router.route('/signup')
  .post(createLogin);

Router.route('/contact/:id')
  .post(createContact)
  .get(getContacts);

Router.route('/room')
  .get(getAllRoomTimeslots)
  .post(createRoom);

Router.route('/rooms')
  .get(getAllRooms);

Router.route('/room/:id')
  .delete(removeRoom)
  .put(updateRoom);

Router.route('/timeslot')
  .post(scheduleTimeslot);

Router.route('/timeslot/:id')
  .delete(cancelTimeslot)
  .put(updateTimeslotInfo);

export { Router };
