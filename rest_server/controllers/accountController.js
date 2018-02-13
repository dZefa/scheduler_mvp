import { getPW, createUser, updateUser, getAllUsers, getAdminId } from '../database/controllers/userControllers';
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

const getLogins = (req, res) => {
  getAllUsers()
    .then(async (users) => {
      const userObj = [];
      for (let i = 0; i < users.length; i++) {
        await getAllContacts(users[i].id)
          .then(data => {
            users[i].contacts = data;
            userObj.push(users[i]);
          })
      }
      res.status(200).send({ result: userObj });
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const getAdminContacts = (req, res) => {
  getAdminId()
    .then(id => {
      getAllContacts(id)
        .then(data => {
          res.status(200).send({ result: data });
        })
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { checkLogin, createLogin, updateLogin, createContact, getContacts, getLogins, getAdminContacts };
