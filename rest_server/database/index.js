import Sequelize from 'sequelize';

const db = new Sequelize(process.env.DB_URL);

export { db };
