import { Request, Response, NextFunction } from 'express';

// Catch unknown routes
export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: `🔍 Not Found: ${req.originalUrl}` });
};

// Catch errors thrown in routes
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
  });
};
