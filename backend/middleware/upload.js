const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // folder to save uploads
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname); 
    cb(null, filename);
  },
});

// Multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
