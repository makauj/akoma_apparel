import bcrypt from 'bcrypt';

export const hashPassword = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plain, salt);
};

export const comparePasswords = async (
  input: string,
  hashed: string
): Promise<boolean> => {
  return await bcrypt.compare(input, hashed);
};
