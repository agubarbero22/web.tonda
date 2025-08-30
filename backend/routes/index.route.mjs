import { Router } from "express";
import usersRouter from "./users.route.mjs";
import captchaRouter from "./captcha.route.mjs";
import shortenerRouter from "./shortener.route.mjs";
import reviewsRouter from "./reviews.route.mjs";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Server Deployed 🥳");
});

// Resource routes
indexRouter.use("users", usersRouter);
indexRouter.use("verify-recaptcha", captchaRouter);
indexRouter.use("shortener", shortenerRouter);
indexRouter.use("reviews", reviewsRouter);

export default indexRouter;
