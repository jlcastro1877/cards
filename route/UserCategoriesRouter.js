const { authentication } = require("../controller/authController");
const {
  createUserCategories,
  getAllUserCategories,
} = require("../controller/userCategoriesController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, createUserCategories)
  .get(authentication, getAllUserCategories);

module.exports = router;
