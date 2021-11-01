 const { Pool } = require("pg");

 const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "test",
     password: "0658",
     port: 5432
 });

 module.exports = {
     query: (text, params) => pool.query(text, params),
 };