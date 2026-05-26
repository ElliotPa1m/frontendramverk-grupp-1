import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getDataFromLS, saveDataToLS } from "../utils/localStorageFns";
import { getUserRecipes, saveUserRecipe, deleteUserRecipe, updateUserRecipe } from "../services/userRecipeService";

/*----------------------------------------------/ 
/                                               /
/           RecipesContext                      /     
/                                               /
/----------------------------------------------*/

// Re-written from FavouritesContext to RecipesContext
// Now handles the Favorite recipes array *and* the User created recipes array

/*

to use this context in a component:

import { useRecipes } from '../contexts/RecipesContext';

function RecipeCard({ recipe }) {
  const { addFavourite, removeFavourite, addCreated, updateCreated, removeCreated, isFavourite, isCreated } = useRecipes();

*/

const RecipesContext = createContext();

// Keeps this hook grouped with its context instead of moving it to a separate file; ignoring the lint-warning and  using a one-line-lint-disable will not affect production behavior.

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};

export const RecipesProvider = ({ children }) => {
  // Initialises 'favourites' state from local storage if existing, otherwise starts as [].
  const [favourites, setFavourites] = useState(() => {
    const stored = getDataFromLS("favouriteRecipes");
    return stored ? JSON.parse(stored) : [];
  });
  const [userRecipes, setUserRecipes] = useState(() => getUserRecipes());

  // syncs changes to favourties with local storage
  useEffect(() => {
    saveDataToLS("favouriteRecipes", JSON.stringify(favourites));
  }, [favourites]);
  // We don't need a useEffect like above for userRecipes!
  // Favorites: Modifies React State -> useEffect saves it to localStorage
  // User Recipes: Service saves it to localStorage via saveUserRecipe -> Modifies React State
  // See further comments in addCreated down below

  const addFavourite = (recipe) => {
    setFavourites((prev) => [
      ...prev,
      {
        ...recipe,
        rating: recipe.rating ?? (Math.random() * 5).toFixed(1),
      },
    ]);
  };

  const addCreated = (recipe) => {
    saveUserRecipe(recipe);           // The service layer writes directly to localStorage
    setUserRecipes(getUserRecipes()); // React state is updated by reading that fresh data!
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  };

  // Once again, the implementation needs to be different for revmoveCreated since we're not relying on the useEffect and instead using the service functions
  // It follows the same pattern:
  const removeCreated = (id) => {
    deleteUserRecipe(id);             // 1. Delete it from the hard drive using our service
    setUserRecipes(getUserRecipes()); // 2. Pull the fresh, filtered array back into React state
  };

  // Uses the exact same predictable pattern
  const updateCreated = (updatedRecipe) => {
    updateUserRecipe(updatedRecipe);
    setUserRecipes(getUserRecipes());
  };

  // useMemo maps and caches a set of recipe IDs for faster 'isFavourite'-look up. the set is only recalculated when [favourites] change.
  const favouriteIds = useMemo(
    () => new Set(favourites.map((recipe) => recipe.idMeal)),
    [favourites],
  );
  const isFavourite = (id) => {
    return favouriteIds.has(id);
  };

  // Reused for userRecipes for faster 'isCreated', it's a brilliant solution
  const createdIds = useMemo(
    () => new Set(userRecipes.map((recipe) => recipe.id)),
    [userRecipes],
  );
  const isCreated = (id) => {
    return createdIds.has(id);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  };

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
};
