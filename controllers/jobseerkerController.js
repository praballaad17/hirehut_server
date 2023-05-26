const { EmployeerProfile } = require("../models/EmployeerProfile");
const Job = require("../models/job");
const { JobJobseekerApply, SavedJobs } = require("../models/jobseekerProfile");

module.exports.searchJobs = async (req, res) => {
  console.log("job search", req.query);
  try {
    const jobs = await Job.find().populate("location").populate("profileId");

    // console.log(jobs);
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.jobseekerJobApply = async (req, res) => {
  const { userId, jobId, status } = req.body;
  try {
    const relatetion = new JobJobseekerApply({
      userId,
      jobId,
      status,
    });
    await relatetion.save();
    res.send(relatetion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.saveJob = async (req, res) => {
  const { userId, jobId } = req.body;
  try {
    const relatetion = new SavedJobs({
      userId,
      jobId,
    });
    await relatetion.save();
    res.send(relatetion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.fetchSavedJobs = async (req, res) => {
  try {
    const jobs = await SavedJobs.find({ userId: req.params.userId })
      .populate("jobId")
      .populate({
        path: "jobId",
        populate: {
          path: "profileId",
        },
      });
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.fetchAppliedJobs = async (req, res) => {
  try {
    const jobs = await JobJobseekerApply.find({ userId: req.params.userId })
      .populate("jobId")
      .populate({
        path: "jobId",
        populate: {
          path: "location",
        },
      })
      .populate({
        path: "jobId",
        populate: {
          path: "profileId",
        },
      });
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.deleteSavedJob = async (req, res) => {
  const { userId, jobId } = req.params;
  try {
    const relatetion = await SavedJobs.deleteOne({
      userId,
      jobId,
    });
    res.send(relatetion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.checkApplyJob = async (req, res) => {
  const { userId, jobId } = req.body;
  try {
    const relatetion = await JobJobseekerApply.findOne({
      userId,
      jobId,
    });

    if (relatetion) {
      res.status(409).send("already applied");
    } else {
      res.status(404).send("not applied");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.fetchJobByJobId = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId).populate("location");
    res.status(200).send(job);
  } catch (error) {
    res.sendStatus(500);
  }
};
