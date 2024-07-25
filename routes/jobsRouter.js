const express = require("express");
const {
  getJobs,
  newJobCreate,
  updateJobs,
  deleteJob,
} = require("../controllers/jobController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/jobs").get(getJobs);
router.route("/jobs/new").post(newJobCreate);
router
  .route("/job/:id")
  .put(isAuthenticatedUser, authorizeRoles("employeer", "admin"), updateJobs);
router.route("/job/:id").delete(isAuthenticatedUser, deleteJob);

module.exports = router;
