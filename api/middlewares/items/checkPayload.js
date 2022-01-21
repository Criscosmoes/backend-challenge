const checkPayload = async (req, res, next) => {
  try {
    const { item_id, item_name, item_price, item_count, category } = req.body;

    if (!item_name || !item_price || !category || item_count < 0) {
      return res
        .status(400)
        .send("Please provide an item name, price, count, and category");
    }

    req.payload = req.body;

    next();
  } catch (error) {
    res.status(500).send("test");
  }
};

module.exports = {
  checkPayload,
};
