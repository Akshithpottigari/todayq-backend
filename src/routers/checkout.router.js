const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  CreateCheckout,
  uploadDocument,
} = require("../controllers/checkout.controller");
const { UserJWTMiddleware } = require("../middlewares/userJwtMiddleware");

const uploadDirectory = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", UserJWTMiddleware, CreateCheckout);

router.post(
  "/upload",
  UserJWTMiddleware,
  upload.single("file"),
  uploadDocument
);

module.exports = router;
