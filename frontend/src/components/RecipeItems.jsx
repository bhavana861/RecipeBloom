import React, {useEffect, useState} from "react";
import {getAllRecipes,getMyRecipes} from "../api/recipeApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import './RecipeItems.css'
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const RecipeItems = ({ myRecipe, showFav }) => {

const [recipes,setRecipes] = useState([]);
const navigate = useNavigate();
const [isFavRecipe,setIsFavRecipe]=useState(false)
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id;
let favItems =
  JSON.parse(localStorage.getItem(`fav_${userId}`)) ?? [];

useEffect(()=>{

const fetchRecipes = async()=>{

  try{

    let res;

    if(myRecipe){

      res = await getMyRecipes();

    }else{

      res = await getAllRecipes();

    }


    setRecipes(res.data);

  }
  catch(error){
    console.log(error);
  }

}

fetchRecipes();

},[myRecipe]);

let displayRecipes = recipes;

if (showFav) {
  const fav =
    JSON.parse(localStorage.getItem(`fav_${userId}`)) ?? [];

  displayRecipes = recipes.filter(item =>
    fav.some(f => f._id === item._id)
  );
}

const editRecipe = (e, id) => {
  e.stopPropagation();
  navigate(`/edit/${id}`);
};

const deleteRecipe = async(id)=>{

try{

await axios.delete(
`https://recipebloom-1.onrender.com/recipe/${id}`,
{
headers:{
authorization:"bearer "+localStorage.getItem("token")
}
}
);


setRecipes(
 recipes.filter(item=>item._id !== id)
);


}
catch(error){
 console.log(error);
}

}

const favRecipe = (item) => {
  let exists = favItems.some((r) => r._id === item._id);

  if (exists) {
    favItems = favItems.filter((r) => r._id !== item._id);
  } else {
    favItems = [...favItems, item];
  }

  localStorage.setItem(`fav_${userId}`, JSON.stringify(favItems));

  setIsFavRecipe((prev) => !prev);
};
return (
  <div className="recipe-container">

    {displayRecipes.length === 0 ? (
  <p>
    {showFav
      ? "No favourites added yet ❤️"
      : myRecipe
      ? "You haven't added any recipes yet."
      : "No recipes available right now."}
  </p>
): (
      displayRecipes.map((item) => (
        <div
          className="recipee-card"
          key={item._id}
          onClick={() => navigate(`/recipe/${item._id}`)}
        >

          <div className="image-box">
            <img src={item.coverImage} alt={item.title} />

          {  <FavoriteIcon className="heart-icon" onClick={(e) => {
  e.stopPropagation();
  favRecipe(item);
}} style={{
  color: favItems.some((r) => r._id === item._id)
    ? "red"
    : "white",
}}/> }
          </div>

          <div className="recipe-content">
            <h3>{item.title}</h3>
            <p>{item.time}</p>

            {myRecipe && (
              <div className="recipe-actions">

                <button
                  className="icon-btn edit"
                  onClick={(e) => editRecipe(e, item._id)}
                >
                  <EditIcon />
                </button>

                <button
                  className="icon-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRecipe(item._id);
                  }}
                >
                  <DeleteIcon />
                </button>

              </div>
            )}

          </div>
        </div>
      ))
    )}

  </div>
);
}


export default RecipeItems;