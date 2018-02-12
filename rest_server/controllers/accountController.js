import { getPW, createUser, updateUser } from '../database/controllers/userControllers';

const checkLogin = (req, res) => {
  getPW(req.body.login)
    .then(pw => {
      if (pw !== req.body.password) {
        res.sendStatus(403);
      } else {
        res.status(200).send(`Authorized`);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const createLogin = (req, res) => {
  createUser(req.body)
    .then(success => {
      res.status(201).send(success);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateLogin = (req, res) => {
  updateUser(req.body)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

export { checkLogin, createLogin, updateLogin };
