import { Router } from "express";
import { addReview } from "../controllers/reviews.controller.mjs";

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

const reviewsRouter = Router();

reviewsRouter.post("/", addReview);

export default reviewsRouter;
