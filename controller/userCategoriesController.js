const user = require("../db/models/user");
const usercategories = require("../db/models/usercategories");
const userCategories = require("../db/models/usercategories");
const AppError = require("../utils/appError");
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
  const userId = req.user.id;
  const result = await userCategories.findAll({
    include: user,
    where: { id_user: userId },
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getCategoriesById = catchAsync(async (req, res, next) => {
  const categorieId = req.params.id;
  const result = await usercategories.findByPk(categorieId, { include: user });

  if (!result) {
    return next(new AppError("Invalid category Id", 400));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updateUserCategories = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const categorieId = req.params.id;
  const body = req.body;

  // const result = await usercategories.findByPk(categorieId);

  const result = await usercategories.findOne({
    where: { id: categorieId, id_user: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  result.id_categorie = body.id_categorie;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteUserCategories = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const categorieId = req.params.id;
  const body = req.body;

  // const result = await usercategories.findByPk(categorieId);

  const result = await usercategories.findOne({
    where: { id: categorieId, id_user: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record deleted successfully",
  });
});

module.exports = {
  createUserCategories,
  getAllUserCategories,
  getCategoriesById,
  updateUserCategories,
  deleteUserCategories,
};
