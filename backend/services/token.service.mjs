export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    const secretToken = process.env.REVIEWS_VIEW_TOKEN;
    if (token === secretToken) {
      resolve(true);
    } else {
      reject(new Error('Invalid token'));
    }
  });
};
