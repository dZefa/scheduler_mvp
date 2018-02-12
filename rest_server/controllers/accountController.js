import { getPW, createUser, updateUser } from '../database/controllers/userControllers';
import { addContact, getAllContacts } from '../database/controllers/contactController';

const checkLogin = (req, res) => {
  getPW(req.body.login)
    .then(user => {
      if (user.password !== req.body.password) {
        res.sendStatus(403);
      } else {
        res.status(200).send({ result: user });
      }
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const createLogin = (req, res) => {
  createUser(req.body)
    .then(success => {
      res.status(201).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const updateLogin = (req, res) => {
  updateUser(req.body)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const createContact = (req, res) => {
  addContact(req.body, req.params.id)
    .then(success => {
      res.status(201).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const getContacts = (req, res) => {
  getAllContacts(req.params.id)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { checkLogin, createLogin, updateLogin, createContact, getContacts };
