const express = require("express");
const connectDb = require("./connectdb");
const app = express();
const dotenv = require("dotenv");
const jobsRouter = require("./routes/jobsRouter");
const ErrorMiddleware = require("./middlewares/error");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 8080;

app.use("/api/v1", jobsRouter);
app.all("*", (req, res, next) => {
  // next(new ErrorMiddleware(`${req.originalUrl} not found`), 404);
  res.status(404).json({
    message: `${req.originalUrl} not found`,
    success: false,
  });
});

const server = connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Failed to connect to the database. Server not started.",
      err
    );
  });

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
