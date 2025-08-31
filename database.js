import mysql from "mysql2/promise";

const poolData = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'usuarios_db'
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
