const { findOne, findById } = require("../models/blog_model");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  const { token } = req.cookies;

  //decrypt jwt
  try {
    const decode = jwt.verify(token, "I like banku.");

    const isUser = await User.findById(decode.id);
    if (!isUser) {
      return res.send({ message: "access denied" });
    }
    req.user = isUser;
    next();
  } catch (error) {
    console.log(error);
    res.send({ message: "error ocured try again" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.send({ message: "Access denied" });
    } else {
      next();
    }
  };
};
