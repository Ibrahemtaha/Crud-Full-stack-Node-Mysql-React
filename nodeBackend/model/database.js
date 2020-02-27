const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
