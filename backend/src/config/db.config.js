
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store_rating_db', process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = sequelize;