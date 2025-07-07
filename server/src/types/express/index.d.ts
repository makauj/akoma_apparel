import { Types } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId | string;
        isAdmin?: boolean;
        email?: string;
        name?: string;
      };
    }
  }
}
