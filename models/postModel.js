// Import the mongoose library, which allows us to interact with MongoDB
const mongoose = require("mongoose");

// Define the structure of the Post using a schema
const postSchema = new mongoose.Schema({
  // Define the 'title' field of the Post
  title: {
    type: String,           // The data type of this field is a string
    required: [true, "Post must have a title"],  // It is required and needs an error message if not provided
  },
  // Define the 'body' field of the Post
  body: {
    type: String,           // The data type of this field is a string
    required: [true, "Post must have a body"],   // It is required and needs an error message if not provided
  },
});

// Create a Post model using the defined schema
const Post = mongoose.model("Post", postSchema);

// Export the Post model to be used in other parts of the application
module.exports = Post;
