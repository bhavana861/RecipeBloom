import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RecipeDetails.css"

const RecipeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`https://recipebloom-1.onrender.com/recipe/${id}`);
      setRecipe(res.data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <h2 className="loading">Loading...</h2>;

  const isOwner = user?._id === recipe.createdBy;

const editRecipe = () => {
  navigate(`/edit/${id}`);
};

 const deleteRecipe = async () => {
  try {
    await axios.delete(
      `https://recipebloom-1.onrender.com/recipe/${id}`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    );
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="details-page">

      <div className="hero-image">
        <img src={recipe.coverImage} alt={recipe.title} />
        <div className="overlay"></div>
      </div>

      <div className="glass-card">

        <h1>{recipe.title}</h1>

        <div className="meta">
          ⏱ {recipe.time}
        </div>

     <ul className="list"> <span>🧾 Ingredients</span>
  {recipe.ingredients?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

        <ol className="list"> <span>👨‍🍳 Instructions</span>
  {recipe.instructions?.split(".").map((step, index) => (
    step.trim() && <li key={index}>{step}</li>
  ))}
</ol>

     {isOwner && (
  <div className="floating-actions">

    <button className="edit" onClick={editRecipe}>
      <EditIcon />
    </button>

    <button className="delete" onClick={deleteRecipe}>
      <DeleteIcon />
    </button>

  </div>
)}

      </div>

    </div>
  );
};

export default RecipeDetails;