const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const JobseekerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  city: String,
  state: String,
  profileUrl: String,
  twitter: String,
  github: String,
  linkedIn: String,
  portfolio: String,
  workexperiance: [],
  education: [],
  skills: [],
  achivements: String,
  pronoun: String,
  gender: String,
  race: [],
  bio: String,
  primaryRole: String,
  roles: [],
  experiance: String,
});

const JobApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
  status: String,
});

const SavedJobsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

const JobseekerProfile = mongoose.model(
  "JobseekerProfile",
  JobseekerProfileSchema
);

const SavedJobs = mongoose.model("SavedJobs", SavedJobsSchema);

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
module.exports = { JobseekerProfile, JobApplication, SavedJobs };
