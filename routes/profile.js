const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const { updateProfile, getProfile } = require("../controllers/userControllers");

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(null, `${req.params.userId}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});

router.use("/", express.static("images"));

router.post("/update-profile/:userId", upload.single("img"), updateProfile);
router.get("/get-user-profile/:userId", getProfile);
module.exports = router;
