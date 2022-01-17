const router = require("express").Router();
const pool = require("../../db");

router.get("/items", async (req, res) => {
  try {
    const items = await pool.query("SELECT * FROM ITEMS");

    res.send(items.rows);
  } catch (e) {
    console.log(e);
  }
});

router.post("/items", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
