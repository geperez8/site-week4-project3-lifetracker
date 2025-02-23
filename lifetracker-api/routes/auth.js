const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);

    const token = createUserJwt(user);

    return res
      .status(200)
      .json({ token: token, user, message: "User Logged in Successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);

    const token = createUserJwt(user);

    return res
      .status(201)
      .json({ token: token, user, message: "User Created Successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    // console.log("the res.locals.user is ", res.locals.user);
    if (res.locals.user) {
      const { email } = res.locals.user;

      const user = await User.fetchUserByEmail(email);
      // const publicUser = User.makePublicUser(user)
      return res.status(200).json({ user: user });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
