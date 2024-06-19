const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  const { pic } = req.body;

  try {
    const result = await cloudinary.uploader.upload(pic, {
      folder: 'profile-pics', 
    });

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user._id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this profile picture');
    }

    user.pic = result.secure_url;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } catch (error) {
    console.error('Error updating profile picture:', error.message);
    res.status(500).json({ message: 'Failed to update profile picture' });
  }
});

module.exports = { registerUser, authUser, updateProfilePicture};