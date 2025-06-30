import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
}
