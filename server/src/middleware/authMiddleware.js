import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. Token missing.");
  }

  if (!process.env.JWT_SECRET) {
    res.status(500);
    throw new Error("JWT_SECRET is not configured.");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error(
      error.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid token."
    );
  }

  req.user = await User.findById(decoded.userId).select("-password");

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized. User not found.");
  }

  next();
});
