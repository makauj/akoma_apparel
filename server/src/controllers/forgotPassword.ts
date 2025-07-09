import { sendEmail } from '../utils/sendEmail';
import { Request, Response } from 'express';
import User from '../models/User';
import generateResetCode from '../utils/generateResetCode';

// @desc    Handle forgot password
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const code = generateResetCode();
  user.resetCode = code;
  user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail({
    to: user.email,
    subject: 'Your Akoma Apparel Password Reset Code',
    text: `Your reset code is: ${code}`,
  });

  res.json({ message: 'Reset code sent to your email' });
};
