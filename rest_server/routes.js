import express from 'express';

import { checkLogin, createLogin, updateLogin } from './controllers/accountController';
import { createRoom, removeRoom, updateRoom, getAllRoomTimeslots } from './controllers/roomController';

const Router = express.Router();

Router.route('/login')
  .post(checkLogin)
  .put(updateLogin);

Router.route('/signup')
  .post(createLogin);

Router.route('/room')
  .get(getAllRoomTimeslots)
  .post(createRoom);

Router.route('/room/:id')
  .delete(removeRoom)
  .put(updateRoom);

export { Router };
