const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// routes
const ItemRouter = require("./routes/items");

const server = express();

// middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// after middleware
server.use("/api", ItemRouter);

module.exports = server;
