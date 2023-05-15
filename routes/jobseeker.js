const express = require("express");
const { searchJobs } = require("../controllers/jobseerkerController");
const router = express.Router();
router.get("/search-jobs", searchJobs);

module.exports = router;
