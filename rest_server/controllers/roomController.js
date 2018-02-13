import { addRoom, deleteRoom, updateRoom, getRooms } from '../database/controllers/roomController';
import { getTimeslots } from '../database/controllers/timeslotController';

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

const getAllRoomTimeslots = (req, res) => {
  const roomInfo = [];

  getRooms()
    .then(async rooms => {
      for (let i = 0; i < rooms.length; i++) {
        roomInfo[i] = {
          id: rooms[i].id,
          name: rooms[i].name,
          timeslots: []
        };
        await getTimeslots(roomInfo[i].id)
          .then(timeslots => {
            roomInfo[i].timeslots = timeslots;
          });
      }
      res.status(200).send({ result: roomInfo });
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const getAllRooms = (req, res) => {
  getRooms()
    .then(rooms => {
      res.status(200).send({ result: rooms });
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { createRoom, removeRoom, updateRoom, getAllRoomTimeslots, getAllRooms };
