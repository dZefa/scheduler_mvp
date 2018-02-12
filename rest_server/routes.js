import express from 'express';

import { checkLogin, createLogin, updateLogin } from './controllers/accountController';
import { createRoom, removeRoom, updateRoom } from './controllers/roomController';

const Router = express.Router();

Router.route('/login')
  .post(checkLogin)
  .put(updateLogin);

Router.route('/signup')
  .post(createLogin);

Router.route('/room')
  .post(createRoom);

Router.route('/room/:id')
  .delete(removeRoom)
  .put(updateRoom);

export { Router };
