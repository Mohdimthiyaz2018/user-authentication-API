const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const errorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

module.exports = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  req.user = user;
  next(); //to call the next middleware
});
