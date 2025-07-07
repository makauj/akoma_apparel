import { Types } from 'mongoose';
import { Request } from 'express';

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

// Interface for authenticated requests where user is guaranteed to exist
export interface AuthenticatedRequest extends Request {
  user: {
    _id: Types.ObjectId | string;
    isAdmin?: boolean;
    email?: string;
    name?: string;
  };
}
