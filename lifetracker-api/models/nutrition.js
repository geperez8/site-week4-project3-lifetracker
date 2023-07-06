const db = require("../db");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

class Nutrition {
  static async nutritionPost(nutritionData) {
    // user should submit their email, pw rsvp status, and # of guests
    // if any of these fields are missing, throw an error
    const requiredFields = [
      "name",
      "category",
      "calories",
      "image_url",
      "user_id",
    ];

    requiredFields.forEach((field) => {
      if (!nutritionData.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Missing ${field} in nutrition request body.`
        );
      }
    });

    // create a new user in the db with all their info return the user
    const result = await db.query(
      `
        INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING name, category, calories, image_url, user_id;`,
      [
        nutritionData.name,
        nutritionData.category,
        nutritionData.calories,
        nutritionData.image_url,
        nutritionData.user_id,
      ]
    );

    const user = result.rows[0];

    return user;
  }

  static async fetchNutritionById(userId) {
    if (!userId) {
      throw new BadRequestError("No userId provided");
    }

    const query = `SELECT * FROM nutrition WHERE user_id = $1`;

    const result = await db.query(query, [userId]);

    const nutritionData = result.rows;

    return nutritionData;
  }
}

const test = async () => {
  merp = await Nutrition.fetchNutritionById(21);

  console.log(merp);
};

test();

module.exports = Nutrition;
