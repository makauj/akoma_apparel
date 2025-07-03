import multer from 'multer';
import fs from 'fs'

// store the uploaded image in memory
const upload = multer({ storage: multer.memoryStorage() });

export const uploadMiddleware = upload.single('image')
