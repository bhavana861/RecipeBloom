const Recipes = require("../models/recipe");
const { json } = require("express");

// helper (IMPORTANT)
const parseIngredients = (ingredients) => {
  if (!ingredients) return [];

  try {
    return Array.isArray(ingredients)
      ? ingredients
      : JSON.parse(ingredients);
  } catch (e) {
    return ingredients.split(",");
  }
};

// GET ALL RECIPES
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET SINGLE RECIPE
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET MY RECIPES
const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({
      createdBy: req.user.id,
    });

    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD RECIPE
const addRecipes = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Required fields cannot be empty",
      });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients: parseIngredients(ingredients),
      instructions,
      time,
      coverImage: req.file ? req.file.path : "",
      createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// EDIT RECIPE (FIXED - NO DATA LOSS)
const editRecipes = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can edit only your own recipes",
      });
    }

    const { title, ingredients, instructions, time } = req.body;

    // SAFE UPDATE OBJECT
    const updatedData = {
      title,
      instructions,
      time,
    };

    if (ingredients !== undefined) {
      updatedData.ingredients = parseIngredients(ingredients);
    }

    if (req.file) {
      updatedData.coverImage = req.file.path;
    }

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.json(updatedRecipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE RECIPE
const deleteRecipes = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own recipes",
      });
    }

    await Recipes.findByIdAndDelete(req.params.id);

    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  editRecipes,
  addRecipes,
  deleteRecipes,
  getRecipe,
  getMyRecipes,
};