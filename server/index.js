import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import { handleError } from "./error.js";

dotenv.config();

// Log all MongoDB related events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

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
    timestamp: new Date().toISOString(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URL:', process.env.MONGODB_URL ? 'URL is set' : 'URL is missing');
    
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log("Connected to MongoDB successfully");
    
    // Test the connection by running a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      codeName: error.codeName
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

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
    process.exit(1);
  }
});

startServer();
