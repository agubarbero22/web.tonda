import { createReview } from '../services/reviews.service.mjs';

export const addReview = async (req, res) => {
  try {
    const { rating, enjoyed_most, improvement_suggestion, would_recommend } = req.body;

    // Validation
    if (!rating || !enjoyed_most || !would_recommend) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reviewData = { rating, enjoyed_most, improvement_suggestion, would_recommend };
    const { id } = await createReview(reviewData);

    res.status(201).json({ success: true, reviewId: id });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
};
