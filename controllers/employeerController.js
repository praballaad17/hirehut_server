const { Branch } = require("../models/EmployeerProfile");
const Job = require("../models/job");
const {
  JobApplication,
  JobseekerProfile,
} = require("../models/jobseekerProfile");
const { Conversation } = require("../models/message");

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
  try {
    const branch = await Branch.findById(req.body.location);
    req.body.state = branch.state;
    req.body.city = branch.city;
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

//fetch job candidates
module.exports.getJobCandidates = async (req, res) => {
  try {
    const candidates = await JobApplication.find({
      jobId: req.params.jobId,
    })
      .populate("userId")
      .populate({
        path: "userId",
        populate: { path: "profileId" },
      });

    res.send(candidates);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//accept job application
module.exports.acceptJobApplication = async (req, res) => {
  console.log(req.params.jobId, req.params.candidateId);
  try {
    const jobApplication = await JobApplication.findOneAndUpdate(
      {
        jobId: req.params.jobId,
        userId: req.params.candidateId,
      },
      {
        $set: {
          status: "accepted",
        },
      },
      {
        new: true,
      }
    );

    let job = {};

    try {
      job = await Job.findOne({ _id: jobApplication.jobId }).select("userId");
    } catch (error) {
      console.log(error);
    }

    const converation = new Conversation({
      jobseeker: jobApplication.userId,
      employer: job.userId,
      job: job._id,
    });

    await converation.save();

    res.send("updated");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
