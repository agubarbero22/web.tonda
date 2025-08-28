import supabase from "../config/supabase.mjs";

export const createReview = (review) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rating, enjoyed_most, improvement_suggestion, would_recommend } = review;

      const reviewData = {
        rating,
        enjoyed_most,
        would_recommend,
      };

      if (improvement_suggestion !== undefined) {
        reviewData.improvement_suggestion = improvement_suggestion;
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select('id')
        .single();

      if (error) throw error;

      resolve({ id: data.id });
    } catch (err) {
      reject(err);
    }
  });
};
