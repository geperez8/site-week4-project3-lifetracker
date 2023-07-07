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

nutritionRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await Nutrition.fetchNutritionById(id)
    // const publicUser = User.makePublicUser(user)
    return res.status(200).json({ nutritionData: data });
  } catch (err) {
    next(err);
  }
});

module.exports = nutritionRouter;
