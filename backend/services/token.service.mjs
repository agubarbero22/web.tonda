export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    const secretToken = process.env.TURSO_DB_TOKEN;
    console.log(process.env.TURSO_DB_TOKEN)
    if (token === secretToken) {
      resolve(true);
    } else {
      reject(new Error('Invalid token'));
    }
  });
};
