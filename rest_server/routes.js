import express from 'express';

import { getLogins, checkLogin, createLogin, updateLogin, createContact, getContacts, updateContactInfo, deleteContactInfo, deleteLoginInfo } from './controllers/accountController';
import { createRoom, removeRoom, updateRoomName, getAllRoomTimeslots, getAllRooms } from './controllers/roomController';
import { scheduleTimeslot, cancelTimeslot, updateTimeslotInfo, getUserTimeslots } from './controllers/timeslotController';

const Router = express.Router();

Router.route('/login')
  .get(getLogins)
  .post(checkLogin);

Router.route('/login/:id')
  .put(updateLogin)
  .delete(deleteLoginInfo);

Router.route('/signup')
  .post(createLogin);

Router.route('/contact/:id')
  .put(updateContactInfo)
  .post(createContact)
  .get(getContacts)
  .delete(deleteContactInfo);

Router.route('/room')
  .get(getAllRoomTimeslots)
  .post(createRoom);

Router.route('/rooms')
  .get(getAllRooms);

Router.route('/room/:id')
  .delete(removeRoom)
  .put(updateRoomName);

Router.route('/timeslot')
  .post(scheduleTimeslot);

Router.route('/timeslot/:id')
  .delete(cancelTimeslot)
  .get(getUserTimeslots)
  .put(updateTimeslotInfo);

export { Router };
