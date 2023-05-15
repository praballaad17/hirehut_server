const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "EmployeerProfile",
  },
  title: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  status: String,
  profileUrl: String,
  jobType: [],
  shift: [],
  benefits: [],
  supplementPay: [],
  opening: Number,
  detailPDF: String,
  hireTime: String,
  description: String,
  payRate: new Schema({
    start: Number,
    end: Number,
  }),
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
