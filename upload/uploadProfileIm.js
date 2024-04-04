
    const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, "../insta-frontend/src/userProfiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix+file.originalname);
  },
});

const uploadProfileIm = multer({ storage: storage });

module.exports = uploadProfileIm;