const pool = require("../../db");

function getAll() {
  const categories = pool.query(
    `select category_id as id, category_name as name from categories order by id`
  );

  return categories;
}

function addItem(item) {
  const newItem = pool.query(
    `INSERT INTO categories (category_name) VALUES ('${item}')`
  );

  return newItem;
}

module.exports = {
  getAll,
  addItem,
};
