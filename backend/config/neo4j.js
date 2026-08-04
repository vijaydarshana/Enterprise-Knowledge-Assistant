const path = require("path");
const neo4j = require("neo4j-driver");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME,
    process.env.NEO4J_PASSWORD
  )
);

module.exports = driver;