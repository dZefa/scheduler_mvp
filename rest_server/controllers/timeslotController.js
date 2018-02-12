import { addTimeslot, deleteTimeslot, updateTimeslot } from '../database/controllers/timeslotController';

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
  updateTimeslot(req.body)
    .then(success => {
      res.status(200).send(success);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

export { scheduleTimeslot, cancelTimeslot, updateTimeslotInfo };