const { authentication } = require("../controller/authController");
const {
  createUserCategories,
  getAllUserCategories,
  getCategoriesById,
  updateUserCategories,
  deleteUserCategories,
} = require("../controller/userCategoriesController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, createUserCategories)
  .get(authentication, getAllUserCategories);

router
  .route("/:id")
  .get(authentication, getCategoriesById)
  .patch(authentication, updateUserCategories)
  .delete(authentication, deleteUserCategories);

module.exports = router;
