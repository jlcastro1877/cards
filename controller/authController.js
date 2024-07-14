const user = require("../db/models/user");

const signup = async (req, res, next) => {
  const body = req.body;

  const newUser = await user.create({
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create the user",
    });
  }

  return res.status(201).json({
    status: "success",
    data: newUser,
  });
};

module.exports = { signup };
