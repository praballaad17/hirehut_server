const { Branch } = require("../models/EmployeerProfile");
const Job = require("../models/job");
const { JobJobseekerApply } = require("../models/jobseekerProfile");

module.exports.addBranch = async (req, res) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.send(branch);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// Get all branches
module.exports.getAllBranch = async (req, res) => {
  try {
    const branches = await Branch.find({ userId: req.params.userId });
    res.send(branches);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.fetchJobByJobId = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    res.status(200).send(job);
  } catch (error) {
    res.sendStatus(500);
  }
};

// delete branch
module.exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.deleteOne({ _id: req.params.id });
    res.send(branch);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.addJob = async (req, res) => {
  console.log(req.body);
  try {
    const job = new Job(req.body);
    await job.save();
    res.send(job);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// Get all Jobs
module.exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.params.userId }).populate(
      "location"
    );
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// delete job
module.exports.deleteJob = async (req, res) => {
  try {
    const jobs = await Job.deleteOne({ _id: req.params.id });
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//
module.exports.editJob = async (req, res) => {
  console.log(req.body);
  const {
    _id,
    title,
    location,
    jobType,
    shift,
    benefits,
    supplementPay,
    opening,
    detailPDF,
    hireTime,
    description,
    payRate,
  } = req.body;
  console.log(_id);
  try {
    const job = await Job.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          title,
          location,
          jobType,
          shift,
          benefits,
          supplementPay,
          opening,
          detailPDF,
          hireTime,
          description,
          payRate,
        },
      },
      {
        new: true,
      }
    );
    res.send(job);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.getJobCandidates = async (req, res) => {
  try {
    const candidates = await JobJobseekerApply.find({
      jobId: req.params.jobId,
    });
    res.send(candidates);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
