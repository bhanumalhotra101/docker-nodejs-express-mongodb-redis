// Import the Post model from the "../models/postModel" file
const Post = require("../models/postModel");

// Function to get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    // Fetch all posts from the database using the Post model
    const posts = await Post.find();

    // Send a success response with the fetched posts
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    // If there's an error, send a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};

// Function to get a single post by its ID
exports.getOnePost = async (req, res, next) => {
  try {
    // Find a post by its ID in the database using the Post model
    const post = await Post.findById(req.params.id);

    // Send a success response with the fetched post
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (e) {
    // If there's an error, send a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};

// Function to create a new post
exports.createPost = async (req, res, next) => {
  try {
    // Create a new post in the database using the data from the request body
    const post = await Post.create(req.body);

    // Send a success response with the created post
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (e) {
    // If there's an error, log it and send a failure response
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};

// Function to update a post by its ID
exports.updatePost = async (req, res, next) => {
  try {
    // Find a post by its ID and update it with the data from the request body
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // Return the updated post
      runValidators: true // Run data validation during update
    });

    // Send a success response with the updated post
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (e) {
    // If there's an error, send a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};

// Function to delete a post by its ID
exports.deletePost = async (req, res, next) => {
  try {
    // Find a post by its ID and delete it from the database
    await Post.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(204).json({
      status: "success",
    });
  } catch (e) {
    // If there's an error, send a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};
