const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;

// use in dev
/* const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "Inventory",
});

module.exports = pool;
 */
