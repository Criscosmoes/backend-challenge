const router = require("express").Router();
const pool = require("../../db");
const Item = require("../models/items");

// middlewares
const { checkPayload } = require("../middlewares/items/checkPayload");

// get all current items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.getAll();

    res.status(200).send(items.rows);
  } catch (e) {
    console.log(e);
  }
});

// we need a item_name, item_price, item_count, category
router.post("/items", [checkPayload], async (req, res) => {
  try {
    await Item.addItem(req.payload);

    res.status(201).send("Item added successfully");
  } catch (error) {
    res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
  }
});

// delete
router.delete("/items", async (req, res) => {
  try {
    const { item_id } = req.body;

    await Item.deleteItem(item_id);

    res.status(200).send("Item deleted successfully");
  } catch (error) {
    res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
  }
});

// update item
router.put("/items", [checkPayload], async (req, res) => {
  try {
    await Item.update(req.payload);

    res.status(200).send("Item updated successfully");
  } catch (error) {
    res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
  }
});

// search by term
router.get("/items/:term", async (req, res) => {
  try {
    const { term } = req.params;

    const users = await Item.searchByTerm(term);

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
