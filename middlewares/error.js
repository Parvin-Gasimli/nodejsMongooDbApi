module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      errMessage: err.message,
      stack: err.stack,
      error: err,
    });
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    res.status(err.statusCode).json({
      status: "error",
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
