const mysql = require("mysql2");
require("dotenv").config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Create a promise-based pool for async/await support
    this.poolPromise = this.pool.promise();
  }

  async query(sql, values = []) {
    try {
      const [data] = await this.poolPromise.query(sql, values);
      return data;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
}

const db = new Database();

module.exports = db;
