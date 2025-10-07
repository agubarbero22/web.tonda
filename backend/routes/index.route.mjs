import { Router } from "express";
import usersRouter from "./users.route.mjs";
import captchaRouter from "./captcha.route.mjs";
import shortenerRouter from "./shortener.route.mjs";
import reviewsRouter from "./reviews.route.mjs";
import tokenRouter from "./token.route.mjs";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Server Deployed 🥳");
});

// Health check endpoint
indexRouter.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

// Resource routes
indexRouter.use("/users", usersRouter);
indexRouter.use("/verify-recaptcha", captchaRouter);
indexRouter.use("/shortener", shortenerRouter);
indexRouter.use("/reviews", reviewsRouter);
indexRouter.use("/verify-token", tokenRouter);

export default indexRouter;
