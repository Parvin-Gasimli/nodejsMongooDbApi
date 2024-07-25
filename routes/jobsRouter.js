const express = require("express");
const {
  getJobs,
  newJobCreate,
  updateJobs,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.route("/jobs").get(getJobs);
router.route("/jobs/new").post(newJobCreate);
router.route("/job/:id").put(updateJobs);
router.route("/job/:id").delete(deleteJob);

module.exports = router;
