import dotenv from "dotenv";
dotenv.config({ path: ".env.backend" });

import express, { json } from "express";
import cors from "cors";
import indexRouter from "../routes/index.route.mjs";

const app = express();
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://web-tonda.vercel.app',
      'https://web-tonda-723t.vercel.app',
      'https://www.tondanapoletana.com.ar',
      'https://tondanapoletana.com.ar',
      'http://localhost:3000',
      'http://localhost:5173'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.set("trust proxy", 1); // for Vercel

app.use(cors(corsOptions));

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// Enhanced CORS middleware
const allowedOrigins = [
  'https://web-tonda.vercel.app',
  'https://web-tonda-723t.vercel.app',
  'https://www.tondanapoletana.com.ar',
  'https://tondanapoletana.com.ar',
  'http://localhost:3000',
  'http://localhost:5173'
];

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  console.log('OPTIONS request from origin:', origin);
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    res.status(200).end();
  } else {
    console.log('CORS blocked OPTIONS request from:', origin);
    res.status(403).end();
  }
});

// Additional CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
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