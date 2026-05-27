import { Pool } from "pg";

// Set up the PostgreSQL connection details
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 6543,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
