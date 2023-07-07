import React from "react";
import "../NutritionCard/NutritionCard.css";

function NutritionCard({ nutritionData }) {
  const { calories, category, name, created_at, image_url, id } = nutritionData;
  const formattedDate = new Date(created_at)
  return (
    <div className="nutrition_card" key={id}>
      <h2 className="creation_date">{formattedDate.toString()}</h2>
      <div className="primary_info">
        <div className="primary_data">
          <img className="card-picture" src={image_url}></img>
          <h2 className="name">{name}</h2>
          <h2 className="category">{category}</h2>
        </div>
        <div className="calories">
          <h3>Calories</h3>
          <h3 className="calories">{calories}</h3>
        </div>
      </div>
    </div>
  );
}

export default NutritionCard;
