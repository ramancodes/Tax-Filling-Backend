const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const newFileName = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFileName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' || 
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/xml' || 
      file.mimetype === 'text/xml' ||
      file.mimetype === 'application/json'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only images, PDF, XML, and JSON files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max size
});

module.exports = { upload };
