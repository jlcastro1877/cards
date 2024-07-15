const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const signup = async (req, res, next) => {
  const body = req.body;

  const newUser = await user.create({
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create the user",
    });
  }

  return res.status(201).json({
    status: "success",
    data: result,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password 1",
    });
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    token,
  });
};

module.exports = { signup, login };
