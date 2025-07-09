import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Admin Authentication
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated!", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Token is invalid or expired!", 401));
  }

  req.user = await User.findById(decoded.id);
  if (!req.user || req.user.role !== "Admin") {
    return next(new ErrorHandler("Not authorized as Admin!", 403));
  }

  next();
});

// Patient Authentication
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("User not authenticated!", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Token is invalid or expired!", 401));
  }

  req.user = await User.findById(decoded.id);
  if (!req.user || req.user.role !== "Patient") {
    return next(new ErrorHandler("Not authorized as Patient!", 403));
  }

  next();
});

// Role-Based Access Control
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403)
      );
    }
    next();
  };
};
