const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters"],
    maxlength: [100, "Title must be at most 100 characters"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    trim: true,
    unique: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    trim: true,
    min: [1, "Salary must be at least 1"],
    max: [10000, "Salary must be at most 10000"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email is invalid"],
    trim: true,
    unique: true,
  },
  industry: {
    type: [String],
    required: [true, "Industry is required"],
    trim: true,
    enum: {
      values: ["IT", "Finance", "Education", "Healthcare", "Marketing"],
      message: "Invalid industry",
    },
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //   },
  //   coordinates: {
  //     type: [Number],
  //     index: "2dsphere",
  //   },
  //   formattedAddress: String,
  //   city: String,
  //   zipcode: String,
  //   country: String,
  // },

  date: {
    type: Date,
    default: Date.now,
  },
});

jobSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Job", jobSchema);
