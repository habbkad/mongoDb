const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//route register
//method post
//access public
exports.registerNewUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  //scramble password with bcrypt
  let salt = 10;
  let hashedPassword = "";
  bcrypt.hash(password, salt, (err, hash) => {
    hashedPassword = hash;
  });

  //creating a new user

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send({ message: `email "${email}" already exist` });
    }
    const newUser = User({ name, email, password: hashedPassword, roles });
    await newUser.save();

    res.status(200).send({ message: `user created successfully` });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: `could not create user` });
  }
};
//route login
//method post
//access public
exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if email exist
    const isEmail = await User.findOne({ email });

    if (!isEmail) {
      return res.send({ message: `user credentials are incorrect` });
    }
    //place user._id into JWT
    const token = jwt.sign({ id: isEmail._id }, "I like banku.", {
      expiresIn: "30d",
    });

    //check password with bcrypt
    bcrypt.compare(password, isEmail.password, function (err, result) {
      if (!result) {
        return res.send({ message: `user credentials are incorrect` });
      } else {
        //set req.user

        console.log(req);

        //response for successfull login
        return res
          .cookie("token", token)
          .send({ message: `user logged in successfully` });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: `could not create user` });
  }
};
//route logout
//method get
//access public
exports.logOut = async (req, res) => {
  res.cookie("token", { token: "" }).send({ message: "logged out!" });
};
