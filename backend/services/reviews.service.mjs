import pool from "../config/db.mjs";

export const createReview = async (review) => {
  const { rating, enjoyed_most, improvement_suggestion, would_recommend } = review;
  const result = await pool.query(
    'INSERT INTO reviews (rating, enjoyed_most, improvement_suggestion, would_recommend) VALUES ($1, $2, $3, $4) RETURNING id',
    [rating, enjoyed_most, improvement_suggestion ?? null, would_recommend]
  );
  return { id: result.rows[0].id };
};

export const getReviews = async () => {
  const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
  return result.rows;
};

export const deleteAllReviews = async () => {
  await pool.query('DELETE FROM reviews');
  return { success: true };
};
