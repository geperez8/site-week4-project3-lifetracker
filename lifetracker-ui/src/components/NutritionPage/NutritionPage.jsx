import React, { useEffect, useState, user } from "react";
import apiClient from "../../services/apiClient";
import NutritionCard from "../NutritionCard/NutritionCard";
import "../NutritionPage/NutritionPage.css";

function NutritionPage({ user, onSubmitNutrition }) {
  const [nutritionData, setNutritionData] = useState([]);

  let userID = null

  if (user.user_id) {
    userID = user.user_id;
  }
  else if (user.id){
    userID = user.id
  }

  const [form, setForm] = useState({
    name: "",
    category: "",
    calories: "",
    quantity: "",
    image_url: "",
    user_id: userID,
  });
  const [forceRendor, setForceRendor] = useState({});

  useEffect(() => {
    const nutritionLoader = async (userId) => {
      console.log("In nutrition page", userId);
      const { data, error } = await apiClient.fetchUserNutrition(userId);

      setNutritionData(data.nutritionData);
    };

    console.log(" we are extracting from:", user);
    
    nutritionLoader(userID);
    
    // else if (user.id){
    //   nutritionLoader(user.id)
    // }

    console.log(user);
  }, [user, forceRendor]);

  const nutritionFeed = nutritionData.map((data) => (
    <NutritionCard nutritionData={data} />
  ));

  const formChangeHandler = (event) => {
    form[event.target.name] = event.target.value;
    setForm({ ...form });
  };

  const handleNutritionSave = async (event) => {
    event.preventDefault();
    const status = await onSubmitNutrition(form);
    setForm({
      name: "",
      category: "",
      calories: "",
      quantity: "",
      image_url: "",
      user_id: user.user_id,
    });
    console.log(event.target);
    setForceRendor({});
  };

  return (
    <div className="nutrition-page">
      <form className="nutrition-form" onSubmit={handleNutritionSave}>
        <h1 className="label">New Nutrition Item</h1>
        <input
          className="input-field"
          name="name"
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={formChangeHandler}
        />
        <br />
        <select
          id="selector"
          name="category"
          value={form.category}
          onChange={formChangeHandler}
          required
        >
          <option value="">Select a category</option>
          <option value="snack">Snack</option>
          <option value="beverage">Beverage</option>
          <option value="food">Food</option>
        </select>
        <br />
        <input
          className="input-field"
          name="quantity"
          type="number"
          placeholder="Quantity"
          required
          value={form.quantity}
          onChange={formChangeHandler}
        />
        <br />
        <input
          className="input-field"
          name="calories"
          type="number"
          placeholder="Calories"
          required
          value={form.calories}
          onChange={formChangeHandler}
        />
        <br />
        <input
          className="input-field"
          name="image_url"
          type="text"
          placeholder="url for image"
          value={form.image_url}
          onChange={formChangeHandler}
        />
        <br />
        <button className="save" type="submit">
          Save
        </button>
      </form>

      <h1>Nutrition Data</h1>
      <div className="nutrition-holder">
        {nutritionData.length === 0 ? (
          <h1>No Data to Display</h1>
        ) : (
          nutritionFeed
        )}
      </div>
    </div>
  );
}

export default NutritionPage;
