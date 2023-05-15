const { EmployeerProfile } = require("../models/EmployeerProfile");
const Job = require("../models/job");

module.exports.searchJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("location").populate("profileId");

    console.log(jobs);
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
