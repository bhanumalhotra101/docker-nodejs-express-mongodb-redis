// Import the Express library
const express = require("express");

// Import the authController module responsible for authentication actions
const authController = require("../controllers/authController");

// Create an instance of an Express Router
const router = express.Router();

// Define routes for user authentication

// Define the route for user signup
router.post("/signup", authController.signUp);

// Define the route for user login
router.post("/login", authController.login);

// Export the router to be used in other parts of the application
module.exports = router;
