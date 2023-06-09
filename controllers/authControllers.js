const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const { EmployeerProfile } = require("../models/EmployeerProfile");
const { JobseekerProfile } = require("../models/jobseekerProfile");

module.exports.loginAuthentication = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .send({ error: "Please provide both a username/email and a password." });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user || !user.password) {
      return res.status(401).send({
        error: "The credentials you provided are incorrect, please try again.",
      });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send({
          error: "Password you provided is incorrect, please try again.",
        });
      }

      let profile;

      if (user.isEmployeer) {
        profile = await EmployeerProfile.findOne({ userId: user._id });
      } else {
        profile = await JobseekerProfile.findOne({ userId: user._id });
      }

      res.send({
        user: {
          _id: user._id,
          email: user.email,
          isEmployeer: user.isEmployeer,
          profileId: profile._id,
        },
        token: jwt.encode(
          {
            id: user._id,
            isEmployeer: user.isEmployeer,
            profileId: profile._id,
          },
          process.env.JWT_SECRET
        ),
      });
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.register = async (req, res, next) => {
  const { email, password, isEmployeer } = req.body;

  try {
    let user = new User({ email, password, isEmployeer });
    let newProfile = {};
    if (isEmployeer) {
      newProfile = new EmployeerProfile({
        userId: user._id,
      });
      user.profileModel = "EmployeerProfile";
    } else {
      newProfile = new JobseekerProfile({
        userId: user._id,
      });
      user.profileModel = "JobseekerProfile";
    }

    user.profileId = newProfile._id;
    try {
      await user.save();
      await newProfile.save();
    } catch (error) {
      console.log(error);
    }
    res.status(201).send({
      user: {
        email: user.email,
        profileId: newProfile._id,
      },
      token: jwt.encode(
        { id: user._id, isEmployeer, profileId: newProfile._id },
        process.env.JWT_SECRET
      ),
    });
  } catch (err) {
    return res.send(err);
  }
};

module.exports.checkEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.find({ email });
    if (user.length) {
      res.status(400).send("Email Already Regisered!");
    } else {
      return res.status(200).send(true);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
