// Importing necessary modules and files
const User = require("../models/userModel"); // Importing the User model
const bcrypt = require("bcryptjs"); // Importing the bcrypt library for password hashing

// Defining the function to handle user sign up
exports.signUp = async (req, res) => {
  // Extracting the username and password from the request body
  const { username, password } = req.body;

  try {
    // Hashing the provided password using bcrypt with a complexity factor of 12
    const hashpassword = await bcrypt.hash(password, 12);

    // Creating a new user with the hashed password
    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    // Storing the information of the newly created user in the session
    req.session.user = newUser;

    // Sending a successful response with the new user's information
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    // Handling errors by sending a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};

// Defining the function to handle user login
exports.login = async (req, res) => {
  // Extracting the username and password from the request body
  const { username, password } = req.body;

  try {
    // Finding a user in the database with the provided username
    const user = await User.findOne({ username });

    // If user not found, send a failure response
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    // Comparing the provided password with the hashed password stored in the database
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      // If passwords match, store user information in the session and send a success response
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      // If passwords don't match, send a failure response
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (e) {
    // Handling errors by sending a failure response
    res.status(400).json({
      status: "fail",
    });
  }
};
