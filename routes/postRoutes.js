// Import the Express library
const express = require("express");

// Import the postController module responsible for handling post-related actions
const postController = require("../controllers/postController");

// Import the protect middleware for authentication
const protect = require("../middleware/authMiddleware");

// Create an instance of an Express Router
const router = express.Router();

// Define routes for different operations related to posts

// Define the route for getting all posts and creating a new post
router
  .route("/")
  .get(protect, postController.getAllPosts)    // Requires authentication using the protect middleware
  .post(protect, postController.createPost);   // Requires authentication using the protect middleware

// Define the route for getting, updating, and deleting a specific post by its ID
router
  .route("/:id")
  .get(protect, postController.getOnePost)    // Requires authentication using the protect middleware
  .patch(protect, postController.updatePost)   // Requires authentication using the protect middleware
  .delete(protect, postController.deletePost); // Requires authentication using the protect middleware

// Export the router to be used in other parts of the application
module.exports = router;
