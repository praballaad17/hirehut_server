const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

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

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send({
          error: "Password you provided is incorrect, please try again.",
        });
      }

      res.send({
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isEmployeer: user.isEmployeer,
        },
        token: jwt.encode(
          {
            id: user._id,
            username: user.username,
            isEmployeer: user.isEmployeer,
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
  let user = null;

  try {
    user = new User({ email, password, isEmployeer });

    await user.save();
    res.status(201).send({
      user: {
        email: user.email,
        username: user.username,
      },
      token: jwt.encode(
        { id: user._id, username: user.username, isEmployeer },
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
