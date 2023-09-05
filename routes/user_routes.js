const express = require("express");
const {
  registerNewUser,
  logIn,
  logOut,
} = require("../controllers/user_controllers");
const router = express.Router();

router.route("/register").post(registerNewUser);
router.route("/login").post(logIn);
router.route("/logout").get(logOut);

module.exports = router;
