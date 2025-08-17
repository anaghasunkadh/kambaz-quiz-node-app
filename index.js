import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import QuestionRoutes from "./Kambaz/Questions/routes.js";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";

const app = express();

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

//  Connect to MongoDB and log connection details
mongoose.connect(CONNECTION_STRING).then(() => {
  console.log(" MongoDB connected");
  console.log("DB Host:", mongoose.connection.host);
  console.log("DB Name:", mongoose.connection.name);
  console.log("DB Port:", mongoose.connection.port);
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Add connection event listeners
mongoose.connection.on('error', (err) => {
  console.error(' MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log(' MongoDB connected');
});

// CORS configuration - MUST come before session
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://stellular-kangaroo-985503.netlify.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  })
);

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

console.log("CORS origin:", process.env.NETLIFY_URL || "http://localhost:5174");
console.log("Session secret:", process.env.SESSION_SECRET || "kambaz");

// Session configuration - simplified for cross-origin
app.use(session({
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,          // Always true for production
    sameSite: "none",      // Required for cross-origin
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());

// Add debug logging
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    console.log(`🔍 ${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
  }
  next();
});

// Register all route handlers
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

//  Add a debug log for /api/quizzes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/quizzes")) {
    console.log(`📥 [${new Date().toISOString()}] Request to: ${req.method} ${req.path}`);
  }
  if (req.path.startsWith("/api/questions")) {
    console.log(`📥 [${new Date().toISOString()}] Request to: ${req.method} ${req.path}`);
  }
  next();
});

QuizRoutes(app);
QuestionRoutes(app);

console.log(" Routes registered:");
console.log("  - Quiz routes: /api/courses/:cid/quizzes, /api/quizzes/:qid");
console.log("  - Question routes: /api/quizzes/:qid/questions, /api/questions/:qid");

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port", process.env.PORT || 4000);
});