import express from 'express';

const Router = express.Router();

Router.route('/login')
  .post();

Router.route('/signup')
  .post();

export { Router };
