const multer = require("multer");
const path = require("path");

// ✅ Storage config (handles both images & videos)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
      cb(null, "./public/images"); // image folder
    } else if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
      cb(null, "./public/videos"); // video folder
    } else {
      cb(new Error("Only image or video files are allowed!"), false);
    }
  },

  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

// ✅ File type filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".avi", ".mkv"];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image or video files are allowed!"), false);
  }
};

// ✅ Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max (adjust as needed)
});

module.exports = upload;
