import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  token: generateToken(user._id)
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("An account with this email already exists.");
  }

  const user = await User.create({ name, email, password });
  res.status(201).json(buildAuthResponse(user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const email = normalizeEmail(req.body.email);

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json(buildAuthResponse(user));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
