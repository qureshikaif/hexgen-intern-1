import { Pool } from "pg";
import "dotenv/config";

const { user, host, database, password, port } = process.env;
const pool = new Pool({
  user,
  host,
  database,
  password,
  port: port ? parseInt(port) : 5432,
});

const createTable = async (tableName: string, columns: string) => {
  const result = await pool.query(
    `
          SELECT EXISTS (
              SELECT FROM information_schema.tables
              WHERE table_name = $1
          )
      `,
    [tableName]
  );
  const tableExists = result.rows[0].exists;
  if (!tableExists) {
    await pool.query(`CREATE TABLE ${tableName} (${columns})`);
  }
};

createTable(
  "users",
  "user_id SERIAL PRIMARY KEY,  first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL, password_hash TEXT NOT NULL"
);

export { pool };
