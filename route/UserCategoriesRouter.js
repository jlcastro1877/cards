const {
  createuUerCategories,
} = require("../controller/userCategoriesController");

const router = require("express").Router();

router.route("/").post(createuUerCategories);

module.exports = router;
