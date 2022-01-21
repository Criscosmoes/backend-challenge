const router = require("express").Router();
const Categories = require("../models/categories");

// get all current items
router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.getAll();

    res.status(200).send(categories.rows);
  } catch (e) {
    console.log(e);
  }
});

router.post("/categories", async (req, res) => {
  try {
    const { category_name } = req.body;

    await Categories.addItem(category_name);

    res.status(201).send("Item added successfully");
  } catch (error) {
    res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
  }
});

module.exports = router;
