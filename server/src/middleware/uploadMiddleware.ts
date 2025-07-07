import multer from 'multer';
import { Request } from 'express';

// File filter function
const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
  // Accept images and videos
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/avi', 'video/mov'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, AVI, MOV) are allowed.'));
  }
};

// Configure multer with file filtering and size limits
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export const uploadMiddleware = upload.single('image');

// Middleware for multiple files upload (if needed later)
export const uploadMultipleMiddleware = upload.array('images', 5);

export default upload;
