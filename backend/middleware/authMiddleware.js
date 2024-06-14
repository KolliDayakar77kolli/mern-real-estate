const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from database excluding password field
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Assign user object to request object for use in other middleware/controllers
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };






// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel.js");
// const asyncHandler = require("express-async-handler");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       //decodes token id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };