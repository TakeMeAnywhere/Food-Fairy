const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  title: String,
  image: String,
  likes: Number,
  summary: String,
  steps: String,
  missedIngredients: String,
  usedIngredients: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);