const express = require("express");
const {
  searchJobs,
  jobseekerJobApply,
  checkApplyJob,
  deleteSavedJob,
  saveJob,
  fetchSavedJobs,
  fetchAppliedJobs,
  fetchJobByJobId,
} = require("../controllers/jobseerkerController");
const router = express.Router();

router.get("/search-jobs", searchJobs);
router.post("/apply-job", jobseekerJobApply);
router.get("/fetch-job/:jobId", fetchJobByJobId);

router.get("/check-apply-job/:userId/:jobid", checkApplyJob);
router.post("/save-job", saveJob);
router.get("/fetch-save-job/:userId", fetchSavedJobs);
router.get("/fetch-applied-job/:userId", fetchAppliedJobs);

router.delete("/delete-save-job/:userId/:jobId", deleteSavedJob);

module.exports = router;
