import express from 'express';

import { checkLogin, createLogin, updateLogin } from './controllers/accountController';

const Router = express.Router();

Router.route('/login')
  .post(checkLogin)
  .put(updateLogin);

Router.route('/signup')
  .post(createLogin);

export { Router };
