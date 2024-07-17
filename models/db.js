const db = require("../models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return db.sequelize.sync({ force: true });
  })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
