 const { Pool } = require("pg");

 const pool = new Pool({
     user: "reader",
     host: "hh-pgsql-public.ebi.ac.uk",
     database: "pfmegrnargs",
     password: "NWDMCE5xdipIjRrp",
     port: 5432
 });

 module.exports = {
     query: (text, params) => pool.query(text, params),
 };