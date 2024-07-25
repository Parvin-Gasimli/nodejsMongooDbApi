const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`Database connected: ${con.connection.host}`);
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = connectDb;
