const express = require("express");
const {
  registerUser,
  authUser,
  updateProfilePicture, 
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.put('/updateProfilePicture', protect, updateProfilePicture);
module.exports = router;