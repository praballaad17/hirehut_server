const { EmployeerProfile } = require("../models/EmployeerProfile");
const Job = require("../models/job");
const {
  JobApplication,
  SavedJobs,
  JobseekerProfile,
} = require("../models/jobseekerProfile");

module.exports.fetchJobseekerProfile = async (req, res) => {
  try {
    const profile = await JobseekerProfile.findOne({
      userId: req.params.userId,
    });

    res.send(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// edit jobseeker profile
module.exports.postJobseekerProfile = async (req, res) => {
  const { form } = req.body;
  console.log(req.body);
  try {
    // const profile = new JobseekerProfile();
    // await profile.save();
    // res.status(201).send(profile);

    const profile = await JobseekerProfile.findOneAndUpdate(
      {
        userId: req.params.userId,
      },
      {
        ...form,
      },
      {
        new: true,
      }
    );

    res.status(202).send(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.searchJobs = async (req, res) => {
  const { what, where } = req.query.query;

  try {
    let query = {
      $or: [],
    };

    if (what.trim() !== "") {
      query.$or = [{ title: { $regex: what, $options: "i" } }];
    } else if (where.trim() === "all") {
      query.$or = [{ city: { $regex: "", $options: "i" } }];
    } else if (where.trim() !== "" || where.trim() !== "all") {
      query.$or = [
        ...query.$or,
        { city: { $regex: where, $options: "i" } },
        { state: { $regex: where, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query)
      // .populate("location")
      .populate("profileId");

    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports.jobseekerJobApply = async (req, res) => {
  const { userId, jobId, status } = req.body;
  try {
    const relatetion = new JobApplication({
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
    const jobs = await JobApplication.find({ userId: req.params.userId })
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
    const relatetion = await JobApplication.findOne({
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
