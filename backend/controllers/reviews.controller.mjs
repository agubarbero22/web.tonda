import { createReview, getReviews, deleteAllReviews } from '../services/reviews.service.mjs';

export const addReview = async (req, res) => {
  try {
    const { rating, enjoyed_most, improvement_suggestion, would_recommend } = req.body;

    // Validation
    if (!rating || !enjoyed_most || !would_recommend) {
      console.error('Validation failed:', { rating, enjoyed_most, would_recommend });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reviewData = { rating, enjoyed_most, improvement_suggestion, would_recommend };
    const { id } = await createReview(reviewData);

    res.status(201).json({ success: true, reviewId: id });
  } catch (error) {
    console.error('Controller Error:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint
    });
    res.status(500).json({ 
      error: 'Failed to submit review',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getAllReviews = async (req, res) => {
  const authHeader = req.headers.authorization;
  const secretToken = process.env.REVIEWS_VIEW_TOKEN;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== secretToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const deleteAllReviewsController = async (req, res) => {
  const authHeader = req.headers.authorization;
  const secretToken = process.env.REVIEWS_VIEW_TOKEN;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== secretToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await deleteAllReviews();
    res.status(200).json({ success: true, message: 'All reviews deleted successfully' });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to delete reviews' });
  }
};
