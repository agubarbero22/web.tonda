import dotenv from "dotenv";
dotenv.config({ path: ".env.backend" });

import express, { json } from "express";
import cors from "cors";
import indexRouter from "../routes/index.route.mjs";

const app = express();
const corsOptions = {
  origin: ['https://web-tonda.vercel.app', 'https://web-tonda-723t.vercel.app'],
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.set("trust proxy", 1); // for Vercel

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(json());
app.use("/", indexRouter);
app.use("*", (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ success: false, message: "404 - Not Found!" });
});

// For Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`));
}