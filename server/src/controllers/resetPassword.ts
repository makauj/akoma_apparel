export const resetPassword = async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ email });

  if (
    !user ||
    user.resetCode !== code ||
    !user.resetCodeExpires ||
    user.resetCodeExpires < new Date()
  ) {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }

  user.password = await hashPassword(newPassword);
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;

  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};
