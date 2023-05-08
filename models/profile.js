const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: String,
  profileUrl: String,
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
