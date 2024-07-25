const Job = require("../models/jobs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFilter = require("../utils/apiFilters");

exports.newJobCreate = catchAsyncError(async (req, res, next) => {
  const newJob = await Job.create(req.body);
  res.status(201).json({
    status: "success",
    data: newJob,
  });
});

exports.getJobs = catchAsyncError(async (req, res, next) => {
  const apifilter = new ApiFilter(Job.find(), req.query).filter().pagination();
  const jobs = await apifilter.query;
  console.log(jobs);
  res.status(200).json({
    status: "success",
    data: jobs,
  });
});

exports.updateJobs = catchAsyncError(async (req, res, next) => {
  let job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 400));
  }
  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job is Updated",
    data: job,
  });
});

exports.deleteJob = catchAsyncError(async (req, res, next) => {
  let job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("job is not found", 400));
  }
  job = await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Job delete successfully",
  });
});
