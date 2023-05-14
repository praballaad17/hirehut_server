const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const JobseekerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: String,
  profileUrl: String,
});

const JobseekerProfile = mongoose.model(
  "JobseekerProfile",
  JobseekerProfileSchema
);
module.exports = JobseekerProfile;
