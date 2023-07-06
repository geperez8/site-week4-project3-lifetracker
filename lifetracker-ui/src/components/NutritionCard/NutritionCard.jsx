import React from "react";
import "../NutritionCard/NutritionCard.css";

function NutritionCard({ nutritionData }) {
  const { calories, category, name, created_at, image_url, id } = nutritionData;

  return (
    <div className="nutrition_card" key={id}>
      <div className="Primary Data">
        <image href={image_url}></image>
        <h2>{name}</h2>
        <h2 className="category">{category}</h2>
      </div>
      <h2 className="calories">{calories}</h2>
      <h2 className="creation_date">{created_at}</h2>
    </div>
  );
}

export default NutritionCard;
