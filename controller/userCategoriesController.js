const userCategories = require("../db/models/usercategories");
const catchAsync = require("../utils/catchAsync");

const createuUerCategories = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newUserCategories = await userCategories.create({
    id_user: body.id_user,
    id_categorie: body.id_categorie,
  });

  return res.status(201).json({
    status: "success",
    data: newUserCategories,
  });
});

module.exports = { createuUerCategories };
