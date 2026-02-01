const express = require("express");
const {
  authUser,
  registerUser,
  updateUserProfile,
} = require("../controllers/user.js");
const { protect } = require("../middlewares/auth.js");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
