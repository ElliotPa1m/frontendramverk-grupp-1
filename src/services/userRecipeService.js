/*----------------------------------------------/ 
/                                               /
/               userRecipeService               /     
/                                               /
/----------------------------------------------*/

import { getDataFromLS, saveDataToLS } from "../utils/localStorageFns";

//getUserRecipes()
//getUserRecipeById(id)
//saveUserRecipe(recipe)
//updateUserRecipe(recipe)
//deleteUserRecipe(id)

const STORAGE_KEY = "userRecipes";

export const getUserRecipes = () => {
  const storedRecipes = getDataFromLS(STORAGE_KEY);
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

export const getUserRecipeById = (id) => {
  return getUserRecipes().find((recipe) => recipe.id == id);
};

export const saveUserRecipe = (recipe) => {
  const storedRecipes = getUserRecipes();
  const newRecipe = {
    ...recipe,
    id: crypto.randomUUID(), // generates a cryptographically secure random number, built in/supported by all moders browsers and node.js
  };
  saveDataToLS(STORAGE_KEY, JSON.stringify([...storedRecipes, newRecipe]));
};

export const updateUserRecipe = (updatedRecipe) => {
  const storedRecipes = getUserRecipes();
  const updatedRecipes = storedRecipes.map((recipe) =>
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
  );
  saveDataToLS(STORAGE_KEY, JSON.stringify(updatedRecipes));
};

export const deleteUserRecipe = (id) => {
  const storedRecipes = getUserRecipes();
  const filteredRecipes = storedRecipes.filter((recipe) => recipe.id !== id);
  saveDataToLS(STORAGE_KEY, JSON.stringify(filteredRecipes));
};
