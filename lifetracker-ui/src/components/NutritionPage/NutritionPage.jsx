import React, { useEffect, useState, user } from "react";
import apiClient from "../../services/apiClient";
import NutritionCard from "../NutritionCard/NutritionCard";
import "../NutritionPage/NutritionPage.css";

function NutritionPage({ user, onSubmitNutrition }) {
  const [nutritionData, setNutritionData] = useState([]);

  useEffect(() => {
    const nutritionLoader = async (userId) => {
      console.log(userId);
      const { data, error } = await apiClient.fetchUserNutrition(userId);

      setNutritionData(data.nutritionData);
    };

    nutritionLoader(user.user_id);

    console.log(user);
  }, [user]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    calories: "",
    quantity: "",
    image_url: "",
    user_id: user.user_id,
  });

  const formChangeHandler = (event) => {
    form[event.target.name] = event.target.value;
    setForm({ ...form });
  };

  const handleNutritionSave = (event) => {
    event.preventDefault();
    const status = onSubmitNutrition(form);
    setNutritionData([ ...nutritionData, form ]);
    setForm({
      name: "",
      category: "",
      calories: "",
      quantity: "",
      image_url: "",
      user_id: user.user_id,
    });
  };

  return (
    <div>
      <form onSubmit={handleNutritionSave}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          required=""
          value={form.name}
          onChange={formChangeHandler}
        />
        <br />
        <select name="category" onChange={formChangeHandler}>
          <option value="beverage">Select a category</option>
          <option value="snack">Snack</option>
          <option value="beverage">Beverage</option>
          <option value="food">Food</option>
        </select>
        <br />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          required=""
          value={form.quantity}
          onChange={formChangeHandler}
        />
        <br />
        <input
          name="calories"
          type="number"
          placeholder="Calories"
          required=""
          value={form.calories}
          onChange={formChangeHandler}
        />
        <br />
        <input
          name="image_url"
          type="text"
          placeholder="url for image"
          required=""
          value={form.image_url}
          onChange={formChangeHandler}
        />
        <br />
        <button type="submit">Save</button>
      </form>

      <h1>Nutrition Data</h1>
      <div>
        {nutritionData.map((data) => (
          <NutritionCard nutritionData={data}/>
        ))}
      </div>
    </div>
  );
}

export default NutritionPage;
