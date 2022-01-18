const router = require("express").Router();
const pool = require("../../db");

// middlewares
const { checkPayload } = require("../middlewares/items/checkPayload");

// get all current items
router.get("/items", async (req, res) => {
  try {
    const items = await pool.query(
      `select item_name as item, item_price as price, item_count as count, category from items`
    );

    res.status(200).send(items.rows);
  } catch (e) {
    console.log(e);
  }
});

// we need a item_name, item_price, item_count, category
router.post("/items", [checkPayload], async (req, res) => {
  try {
    const { item_name, item_price, item_count, category } = req.payload;

    await pool.query(
      `INSERT INTO items (item_name, item_price, item_count, category, created_on) VALUES ('${item_name}', '${item_price}', ${item_count},' ${category}', CURRENT_TIMESTAMP)`
    );

    res.status(201).send("Item added successfully");
  } catch (error) {
    res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
  }
});

// delete

// update item

// search by term
router.get("/items/:term", async (req, res) => {
  try {
    const { term } = req.params;

    const users = await pool.query(
      `SELECT item_name as item, item_price as price, item_count as count, category FROM items WHERE item_name ILIKE '%${term}%' LIMIT 20`
    );

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
