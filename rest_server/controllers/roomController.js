import { addRoom, deleteRoom, updateRoom } from '../database/controllers/roomController';

const createRoom = (req, res) => {
  addRoom(req.body.name)
    .then(success => {
      res.status(201).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const removeRoom = (req, res) => {
  deleteRoom(req.params.id)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const updateRoomName = (req, res) => {
  updateRoom(req.params.id)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { createRoom, removeRoom, updateRoom };
