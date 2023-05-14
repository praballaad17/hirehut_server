const express = require("express");

const router = express.Router();
const {
  addBranch,
  getAllBranch,
  addJob,
  getAllJobs,
  deleteJob,
} = require("../controllers/employeerController");

router.post("/add-branch", addBranch);
router.post("/add-job", addJob);
router.delete("/delete-job/:id", deleteJob);
router.get("/get-all-branches/:userId", getAllBranch);
router.get("/get-all-job/:userId", getAllJobs);

module.exports = router;
