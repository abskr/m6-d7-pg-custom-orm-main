const pg = require("pg");

const pool = new pg.Pool();

const query = async function (queryText, params) {
  const start = Date.now();
  const res = await pool.query(queryText, params);
  const duration = Date.now() - start; // ms
  console.info(`⏱ Query executed in ${duration} ms`);
  return res;
};

module.exports = { query, pool };
