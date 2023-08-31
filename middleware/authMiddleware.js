// Define a middleware function called 'protect'
const protect = (req, res, next) => {
    // Extract the 'user' data from the 'session' object in the request
    const { user } = req.session;
    
    // Check if 'user' data exists in the session
    if (!user) {
      // If 'user' data doesn't exist, send a 401 Unauthorized response with an error message
      return res.status(401).json({ status: "fail", message: "unauthorized" });
    }
  
    // If 'user' data exists in the session, assign it to the 'user' property of the request object
    req.user = user;
    
    // Call the 'next' function to proceed to the next middleware or route handler
    next();
};

// Export the 'protect' middleware function to be used in other parts of the application
module.exports = protect;
