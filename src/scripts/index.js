const dotenv = require("dotenv");

dotenv.config();

const fs = require("fs");

const { join, dirname } = require("path");

const db = require("../db");

const { promisify } = require("util");

const read = promisify(fs.readFile);

const sqlFilePath = join(__dirname, "import.sql");

const createTable = async () => {
  try {
    const data = await read(sqlFilePath);
    const sqlQueryString = data.toString();
    await db.query(sqlQueryString);
    console.info(`✅ All tables are  successfully created.`);
  } catch (e) {
    console.error(`❌ Tables are  not created.`);
    console.error(e);
  }
  db.pool.end();
};

createTable();
