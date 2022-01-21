const pool = require("../../db");

function getAll() {
  const users = pool.query(
    `select item_id as id, item_name as item, item_price as price, item_count as count, category from items order by id`
  );

  return users;
}

function addItem(item) {
  const { item_name, item_price, item_count, category } = item;

  const newItem = pool.query(
    `INSERT INTO items (item_name, item_price, item_count, category, created_on) VALUES ('${item_name}', '${item_price}', ${item_count},' ${category}', CURRENT_TIMESTAMP)`
  );

  return newItem;
}

function deleteItem(item_id) {
  return pool.query(`DELETE FROM items WHERE item_id=${item_id}`);
}

function update(item) {
  const { item_id, item_name, item_price, item_count, category } = item;

  return pool.query(
    `UPDATE items SET item_name='${item_name}', item_price='${item_price}', item_count=${item_count}, category='${category}' WHERE item_id=${item_id}`
  );
}

function searchByTerm(term) {
  const users = pool.query(
    `SELECT item_id as id, item_name as item, item_price as price, item_count as count, category FROM items WHERE item_name ILIKE '%${term}%' LIMIT 20`
  );

  return users;
}

module.exports = {
  getAll,
  addItem,
  deleteItem,
  update,
  searchByTerm,
};
