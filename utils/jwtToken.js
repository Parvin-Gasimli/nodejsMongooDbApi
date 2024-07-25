const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const Option = {
    expires: new Date(
      Date.now() + process.env.COOCKIE_EXPIRE_TIME * 24 * 60 * 60 * 10000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    Option.secure = true;
  }
  res.status(statusCode).cookie("token", token, Option).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
