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

const JobJobseekerApplySchema = new Schema({
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

const JobJobseekerApply = mongoose.model(
  "JobJobseekerApply",
  JobJobseekerApplySchema
);
module.exports = { JobseekerProfile, JobJobseekerApply, SavedJobs };
