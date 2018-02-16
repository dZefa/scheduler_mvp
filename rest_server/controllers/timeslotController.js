import { addTimeslot, deleteTimeslot, updateTimeslot, getAllUserTimeslots, findAllTimeslots } from '../database/controllers/timeslotController';

const scheduleTimeslot = (req, res) => {
  addTimeslot(req.body)
    .then(success => {
      res.status(201).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const cancelTimeslot = (req, res) => {
  deleteTimeslot(req.params.id)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const updateTimeslotInfo = (req, res) => {
  updateTimeslot(req.body, req.params.id)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const getUserTimeslots = (req, res) => {
  getAllUserTimeslots(req.params.id)
    .then(data => {
      res.status(200).send({ result: data });
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const getAllTimeslots = (req, res) => {
  findAllTimeslots()
    .then(data => {
      res.status(200).send({ result: data });
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { scheduleTimeslot, cancelTimeslot, updateTimeslotInfo, getUserTimeslots, getAllTimeslots };
