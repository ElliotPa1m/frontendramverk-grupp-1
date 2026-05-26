import {isCreated } from "../contexts/RecipesContext";

export const recipeReconstructor = (recipe) => {
  const created = isCreated(recipe);
  const recipeObj = {
    idMeal: created ? recipe.id : recipe.idMeal,
    strMeal: created ? recipe.title : recipe.strMeal,
    strMealThumb: created ? recipe.imageUrl : recipe.strMealThumb,
    strCountry: created ? recipe.area : recipe.strCountry,
    strTags: created
      ? recipe.tags?.length
        ? recipe.tags.toString()
        : ""
      : recipe.strTags,
    strCategory: created ? recipe.category : recipe.strCategory,
    rating: recipe.rating,
  };
  return recipeObj;
};
