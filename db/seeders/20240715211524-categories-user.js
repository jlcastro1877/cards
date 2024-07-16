const bcrypt = require("bcrypt");
module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = "test1234";
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert("user", [
      {
        email: "example@example.com",
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
