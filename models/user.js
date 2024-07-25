const mongoose = require("mongoose");
const validate = require("validator");
const bcyrpt = require("bcryptjs");
const JsonwebToken = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validate.isEmail, "Please enter valid email address"],
  },
  role: {
    type: String,
    enum: {
      values: ["user", "employeer"],
      message: "Please select correct role",
    },
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "your password must be at least 8 character long"],
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  this.password = await bcyrpt.hash(this.password, 10);
});
userSchema.methods.getJwtToken = function () {
  return JsonwebToken.sign({ id: this._id }, process.env.JSW_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcyrpt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
