const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

const db = {
  sequelize,
  Sequelize,
  User: require("./user")(sequelize, DataTypes),
};

module.exports = db;
