const express = require("express")
const { getRecipes,addRecipes,editRecipes,deleteRecipes,getRecipe, getMyRecipes } = require("../controller/recipeController")
const router=express.Router()
const upload=require("../middleware/upload");
const verifyToken = require("../middleware/auth");

router.get("/",getRecipes) //get all recipes
router.get("/myRecipe", verifyToken, getMyRecipes);
router.get("/:id",getRecipe) //get recipe by id
router.post("/",upload.single("coverImage"),verifyToken, addRecipes);
router.put("/:id",upload.single("coverImage"), verifyToken,editRecipes) //Edit recipe
router.delete("/:id",verifyToken,deleteRecipes) //Delete recipe


module.exports=router