import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const poolData = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

export async function getUsers(page = 1, limit = 10) {
  const connection = mysql.createPool(poolData);
  let data = [];
  try {
    const offset = (page - 1) * limit;
    const [results] = await connection.query(
      'SELECT id, username FROM users ORDER BY id LIMIT ? OFFSET ?',
      [limit, offset]
    );
    data = results;
  } catch (err) {
    console.log(err.message);
  }
  connection.releaseConnection();
  return data;
}
