const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  isEmployeer: {
    type: Boolean,
  },
  profileId: {
    type: Schema.Types.ObjectId,
    refPath: "profileModel",
  },
  profileModel: {
    type: String,
    required: true,
    enum: ["JobseekerProfile", "EmployeerProfile"],
  },
});

UserSchema.pre("save", function (next) {
  const saltRounds = 10;
  // Check if the password has been modified
  if (this.modifiedPaths().includes("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
