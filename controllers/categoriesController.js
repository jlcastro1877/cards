const express = require("express");
const router = express.Router();

// Dados simulados para as categorias
const categories = [
  { title: "Category 1", description: "Description for category 1" },
  { title: "Category 2", description: "Description for category 2" },
  { title: "Category 3", description: "Description for category 3" },
  { title: "Category 4", description: "Description for category 4" },
  { title: "Category 5", description: "Description for category 5" },
  { title: "Category 6", description: "Description for category 6" },
  { title: "Category 7", description: "Description for category 7" },
  { title: "Category 8", description: "Description for category 8" },
  { title: "Category 9", description: "Description for category 9" },
  { title: "Category 10", description: "Description for category 10" },
];

// Rota para a página de categorias
router.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Categories Page",
    categories: categories,
  });
});

module.exports = router;
