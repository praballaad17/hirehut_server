const express = require("express");

const router = express.Router();
const {
  addBranch,
  getAllBranch,
  addJob,
  editJob,
  getAllJobs,
  deleteJob,
  deleteBranch,
  fetchJobByJobId,
  getJobCandidates,
  acceptJobApplication,
} = require("../controllers/employeerController");

router.post("/add-branch", addBranch);
router.post("/add-job", addJob);
router.put("/edit-job", editJob);

router.get("/fetch-job/:jobId", fetchJobByJobId);
router.get("/candidates/:jobId", getJobCandidates);
router.put("/accept-candidates/:jobId/:candidateId", acceptJobApplication);

router.delete("/delete-branch/:id", deleteBranch);
router.delete("/delete-job/:id", deleteJob);
router.get("/get-all-branches/:userId", getAllBranch);
router.get("/get-all-job/:userId", getAllJobs);

module.exports = router;
