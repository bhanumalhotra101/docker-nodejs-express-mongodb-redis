// Import required libraries and modules
const express = require("express");           // Express framework for creating web applications
const mongoose = require("mongoose");         // Mongoose for working with MongoDB database
const session = require("express-session");   // Express session for managing user sessions
const redis = require("redis");               // Redis for caching and data storage
const cors = require("cors");                 // Cors for handling Cross-Origin Resource Sharing
let RedisStore = require("connect-redis")(session); // Connect Redis with Express session

// Import configuration values from an external file
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

// Create a Redis client
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

// Import route handlers for posts and users
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

// Create an Express application
const app = express();

// Build the MongoDB connection URL using the provided configuration
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// Function to connect to MongoDB with retries
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    })
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000); // Retry connection every 5 seconds if failed
    });
};

// Call the function to connect to MongoDB
connectWithRetry();

// Enable trust for proxy headers (for production deployment)
app.enable("trust proxy");

// Enable CORS (Cross-Origin Resource Sharing) for handling requests from different origins
app.use(cors({}));

// Configure Express session
app.use(
  session({
    store: new RedisStore({ client: redisClient }), // Use Redis for session storage
    secret: SESSION_SECRET,                         // Secret key for session encryption
    cookie: {
      secure: false,          // Set to true in production for secure HTTPS-only cookies
      resave: false,
      saveUninitialized: false,
      httpOnly: true,          // Prevent client-side scripts from accessing cookies
      maxAge: 30000,           // Maximum age of the session (in milliseconds)
    },
  })
);

// Parse JSON request bodies
app.use(express.json());

// Define a route for the root URL
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi Interviewer, hope you are doing good</h2>"); // Send a simple HTML response
  console.log("yeah it ran");   // Log a message to the console
});

// Define routes for posts and users using the imported routers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// Define the port on which the server will listen
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => console.log(`listening on port ${port}`));
