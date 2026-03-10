import dotenv from 'dotenv';
import pg from 'pg';

// Cargar env antes de crear el Pool (en ESM los imports se resuelven antes que el resto de index.mjs)
dotenv.config({ path: '.env.backend' });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
