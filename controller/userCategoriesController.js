const user = require("../db/models/user");
const userCategories = require("../db/models/usercategories");
const catchAsync = require("../utils/catchAsync");

const createUserCategories = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newUserCategories = await userCategories.create({
    id_user: userId,
    id_categorie: body.id_categorie,
  });

  return res.status(201).json({
    status: "success",
    data: newUserCategories,
  });
});

const getAllUserCategories = catchAsync(async (req, res, next) => {
  const result = await userCategories.findAll({ include: user });

  return res.json({
    status: "success",
    data: result,
  });
});

module.exports = { createUserCategories, getAllUserCategories };
