import pool from "../config/db.mjs";

/** Convierte valor del frontend (ej. "Sí, sin dudas", "No", "Tal vez") a boolean para Postgres. */
function toWouldRecommendBoolean(value) {
  if (value === true || value === false) return value;
  const v = String(value).toLowerCase().trim();
  if (v.startsWith('sí') || v.startsWith('si') || v === 'yes' || v === 'true' || v === '1') return true;
  if (v.startsWith('no') || v === 'false' || v === '0') return false;
  // "Tal vez" u otro: guardar como false para respetar NOT NULL
  return false;
}

export const createReview = async (review) => {
  const { rating, enjoyed_most, improvement_suggestion, would_recommend } = review;
  const wouldRecommendBool = toWouldRecommendBoolean(would_recommend);
  const result = await pool.query(
    'INSERT INTO reviews (rating, enjoyed_most, improvement_suggestion, would_recommend) VALUES ($1, $2, $3, $4) RETURNING id',
    [rating, enjoyed_most, improvement_suggestion ?? null, wouldRecommendBool]
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
