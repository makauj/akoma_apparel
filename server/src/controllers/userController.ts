import { Request, Response } from 'express';
import User from '../models/User';
import validateEmail from '../utils/validateEmail';
import { hashPassword, comparePasswords } from '../utils/hashPassword';
import generateToken from '../utils/generateToken';


// @desc    Register user
// @route   POST /api/users/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format'});
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  });
};

// @desc    Login user
// @route   POST /api/users/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 2. Compare password
  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 3. Return user data + token
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  });
};


// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: any, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
export const updateUserProfile = async (req: Request, res: Response) => {
  res.send('Update user profile – not yet implemented');
};

// @desc    Delete user account
// @route   DELETE /api/users/delete
export const deleteUserAccount = async (req: Request, res: Response) => {
  res.send('Delete user account – not yet implemented');
};

// @desc    Get all users (admin only)
// @route   GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  res.send('Get all users – not yet implemented');
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  res.send('Get user by ID – not yet implemented');
};


// @desc    Update user by ID (admin only)
// @route   PUT /api/users/:id
export const updateUserById = async (req: Request, res: Response) => {
  res.send('Update user by ID – not yet implemented');
};

// @desc    Delete user by ID (admin only)
// @route   DELETE /api/users/:id
export const deleteUserById = async (req: Request, res: Response) => {
  res.send('Delete user by ID – not yet implemented');
};

// @desc    Change user password
// @route   POST /api/users/change-password
export const changeUserPassword = async (req: Request, res: Response) => {
  res.send('Change user password – not yet implemented');
};

// @desc    Forgot password
// @route   POST /api/users/forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  res.send('Forgot password – not yet implemented');
};

// @desc    Reset password
// @route   POST /api/users/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  res.send('Reset password – not yet implemented');
};

// @desc    Verify email
// @route   GET /api/users/verify-email/:token
export const verifyEmail = async (req: Request, res: Response) => {
  res.send('Verify email – not yet implemented');
};