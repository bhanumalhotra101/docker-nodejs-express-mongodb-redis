// Import the mongoose library, which allows us to interact with MongoDB
const mongoose = require("mongoose");

// Define the structure of the User using a schema
const userSchema = new mongoose.Schema({
  // Define the 'username' field of the User
  username: {
    type: String,                 // The data type of this field is a string
    required: [true, "User must have a username"],  // It is required and needs an error message if not provided
    unique: true,                 // The 'username' must be unique in the database
  },
  // Define the 'password' field of the User
  password: {
    type: String,                 // The data type of this field is a string
    required: [true, "User must have a password"],  // It is required and needs an error message if not provided
  },
});

// Create a User model using the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
