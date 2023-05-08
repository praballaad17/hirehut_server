const User = require("../models/user");
const fs = require("fs");
const multer = require("multer");
const Profile = require("../models/profile");

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId })
      .select("-password")
      .populate("profileId");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const upload = multer({
  dest: "./images",
});

module.exports.updateProfile = async (req, res) => {
  const profileUrl = `${process.env.DOMAINURL}/api/profile/${req.file.filename}`;
  const profile = await Profile.findOne({ userId: req.params.userId });

  if (profile) {
    await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: {
          profileUrl,
        },
      }
    );
  } else {
    const newprofile = new Profile({
      userId: req.params.userId,
      profileUrl,
    });
    await newprofile.save();
  }

  res.json({
    success: 1,
    profileUrl,
  });
};

module.exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};
