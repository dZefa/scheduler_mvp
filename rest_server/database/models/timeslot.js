import Sequelize from 'sequelize';

import { db } from '../index';
import { User } from './user';
import { Room } from './room';

const Timeslot = db.define('Timeslot', {
  start: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  end: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  finished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

Timeslot.belongsTo(User, { foreignKey: 'userId', allowNull: false, onDelete: 'CASCADE' });
Timeslot.belongsTo(Room, { foreignKey: 'roomId', allowNull: false, onDelete: 'CASCADE' });

User.hasMany(Timeslot);
Room.hasMany(Timeslot);

export { Timeslot };
