import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import { handleError } from "./error.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://fitness-tracker-tawny-nine.vercel.app',
  'https://fitness-tracker-frontend.vercel.app',
  'http://localhost:3000'
];

// Configure CORS with specific options
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Pre-flight OPTIONS request handler
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user/", UserRoutes);

// Error handler middleware
app.use(handleError);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Fitness Tracker API is running",
    timestamp: new Date().toISOString()
  });
});

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

startServer();
