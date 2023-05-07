const express = require("express");
const router = express.Router();

const {
  loginAuthentication,
  register,
  checkEmail,
  // requireAuth,
  // changePassword,
  // genrateOtp,
  // verifyOtp,
  // resetPassOtp,
} = require("../controllers/authControllers");

// router.get("/userId/:id", getUserById);
router.post("/login", loginAuthentication);
router.post("/register", register);
// router.put("/change-password", changePassword);
// router.put("/updateDetails/:userId", updateBusinessDetails);
router.get("/check-email/:email", checkEmail);
// router.get("/generate-otp/:userId", genrateOtp);
// router.get("/forgot-pass-generate-otp/:email", resetPassOtp);
// router.post("/verify-otp/", verifyOtp);
module.exports = router;
