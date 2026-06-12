import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/AddFoodRecipe.css";
import { getRecipeById } from "../api/recipeApi";

export default function AddFoodRecipe() {
const { id } = useParams();
const navigate = useNavigate();
const isEdit = !!id;
const [recipeData, setRecipeData] = useState({
  title: "",
  ingredients: "",
  instructions: "",
  time: "",
  file: null,
  previewImage: ""
});

useEffect(() => {
  if (!id) return;

  getRecipeById(id)
    .then(res => {
      const data = res.data;

      console.log("EDIT DATA:", data);

     setRecipeData({
  title: data.title || "",
  time: data.time || "",
  instructions: data.instructions || "",
  ingredients: Array.isArray(data.ingredients)
    ? data.ingredients.join(", ")
    : data.ingredients || "",
  file: null,
  previewImage: data.coverImage || ""
});
    })
    .catch(err => console.log(err));
}, [id]);

     const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
const onHandleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append(
      "ingredients",
      JSON.stringify(recipeData.ingredients.split(","))
    );
    formData.append("instructions", recipeData.instructions);

    if (recipeData.file) {
      formData.append("coverImage", recipeData.file);
    }

    // ✅ EDIT
    if (isEdit) {
      if (isEdit) {
  const payload = new FormData();

  payload.append("title", recipeData.title);
  payload.append("time", recipeData.time);
  payload.append("instructions", recipeData.instructions);
  payload.append("ingredients", JSON.stringify(recipeData.ingredients.split(",")));

  // if new image selected
  if (recipeData.file) {
    payload.append("coverImage", recipeData.file);
  } else {
    // keep old image
    payload.append("oldImage", recipeData.previewImage);
  }

  await axios.put(
    `https://recipebloom-1.onrender.com/recipe/${id}`,
    payload,
    {
      headers: {
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }
  );

  navigate("/myRecipe");
}
    }

    // ✅ ADD
    else {
      await axios.post(
        "https://recipebloom-1.onrender.com/recipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      );

      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
  return (

    <div className="recipe-wrapper">

      <form  className="recipe-card" onSubmit={onHandleSubmit} >

        <h2>{isEdit? "🍴Update Recipe" :"🍴 Create Recipe"}</h2>

        <p>
     { isEdit?  "Update your recipe,if you want make any changes.":  "Share your delicious recipe with everyone"}
        </p>

        <div className="input-group">
          <label>Title</label>
          <input type="text" name="title" value={recipeData.title} placeholder="Enter recipe name" onChange={onHandleChange} required />
        </div>

        <div className="input-group">
          <label>Time</label>
          <input type="text"  name="time" value={recipeData.time} placeholder="Cooking time" onChange={onHandleChange}  required />
        </div>

        <div className="input-group">
          <label>Ingredients</label>
          <input  type="text"  name="ingredients" value={recipeData.ingredients} placeholder="Rice, Tomato, Onion..." onChange={onHandleChange} required/>
        </div>

        <div className="input-group">
          <label>Instructions</label>
          <textarea  name="instructions" value={recipeData.instructions}  placeholder="Write cooking steps..." onChange={onHandleChange} required />
        </div>

       <div className="file-box">
  <label>Recipe Image</label>

  {/* ✅ SHOW EXISTING IMAGE */}
  {recipeData.previewImage && (
    <img
      src={recipeData.previewImage}
      alt="recipe"
      style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px"
      }}
    />
  )}
  <input
    type="file"
    name="file"
    accept="image/*"
    onChange={onHandleChange}
  />
</div>

        <button className="recipe-btn" type="submit">
  {isEdit ? "Update Recipe ✨" : "Add Recipe ✨"}
</button>
      </form>
    </div>
  );
}