import axios from "axios";

const API = axios.create({
  baseURL: "https://recipebloom-1.onrender.com/"
});


export const getAllRecipes = () => {
  return API.get("/recipe");
};

export const getMyRecipes = ()=>{
 return API.get("/recipe/myRecipe",{
   headers:{
     authorization:"bearer " + localStorage.getItem("token")
   }
 })
}
export const getRecipeById = (id) => {
  return API.get(`/recipe/${id}`);
};