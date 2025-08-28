import { Router } from "express";
import { addReview } from "../controllers/reviews.controller.mjs";
import rateLimit from "express-rate-limit";

// Apply a rate limiter to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

const reviewsRouter = Router();

// Route for submitting a new review
reviewsRouter.post("/", limiter, addReview);

export default reviewsRouter;
