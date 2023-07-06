const express = require("express");
const nutritionRouter = express.Router();
const Nutrition = require("../models/nutrition");

nutritionRouter.post("/", async (req, res, next) => {
  try {
    const nutritionData = await Nutrition.nutritionPost(req.body);

    return res
      .status(200)
      .json({ nutritionData, message: "Nutrition Item added Successfully" });
  } catch (err) {
    next(err);
  }
});

// nutritionRouter.get("/$id", async (req, res, next) => {
//   try {
//     const { email } = res.locals.user;

//     const user = await User.fetchUserByEmail(email);
//     // const publicUser = User.makePublicUser(user)
//     return res.status(200).json({ user: user });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = nutritionRouter;
