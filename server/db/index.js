/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Wed Nov 03 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

require('dotenv').config();

 const { Pool } = require("pg");

 const pool = new Pool();

 module.exports = {
     query: (text, params) => pool.query(text, params),
 };