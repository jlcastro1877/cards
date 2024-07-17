const bcrypt = require("bcryptjs");

const getUserByEmail = async (pool, email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (pool, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    hashedPassword,
  ]);
};

module.exports = { getUserByEmail, createUser };
