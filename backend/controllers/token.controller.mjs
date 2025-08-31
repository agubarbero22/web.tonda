import { verifyToken } from '../services/token.service.mjs';

export const checkToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    await verifyToken(token);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
