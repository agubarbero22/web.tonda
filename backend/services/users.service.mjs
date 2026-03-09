import pool from "../config/db.mjs";

export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return { rows: result.rows };
};

export const getUser = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return { rows: result.rows };
};

export const createUser = async (user) => {
  const { id, email, password, fullname, address, number } = user;
  await pool.query(
    'INSERT INTO users (id, email, password, fullname, address, number) VALUES ($1, $2, $3, $4, $5, $6)',
    [id, email, password, fullname, address ?? null, number ?? null]
  );
};

export const updateUser = async (id, user) => {
  const { email, password, fullname, address, number } = user;
  await pool.query(
    'UPDATE users SET email = $1, password = $2, fullname = $3, address = $4, number = $5 WHERE id = $6',
    [email, password, fullname, address ?? null, number ?? null, id]
  );
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
