import { createContext, useContext, useState, useEffect, useMemo } from "react";

/*----------------------------------------------/ 
/                                               /
/           FavouritesContext (draft)           /     
/                                               /
/----------------------------------------------*/

/*

to use this context in a component:

import { useFavorites } from '../contexts/FavouritesContext';

function RecipeCard({ recipe }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavorites();

*/

const FavouritesContext = createContext();

// Keeps this hook grouped with its context instead of moving it to a separate file; ignoring the lint-warning and  using a one-line-lint-disable will not affect production behavior.

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavouritesProvider");
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  // Initialises 'favourites' state from local storage if existing, otherwise starts as [].
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favouriteRecipes");
    return stored ? JSON.parse(stored) : [];
  });

  // syncs changes to favourties with local storage
  useEffect(() => {
    localStorage.setItem("favouriteRecipes", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (recipe) => {
    setFavourites((prev) => [...prev, recipe]);
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  };

  // useMemo maps and caches a set of recipe IDs for faster 'isFavourite'-look up. the set is only recalculated when [favourites] change.
  const favouriteIds = useMemo(
    () => new Set(favourites.map((recipe) => recipe.idMeal)),
    [favourites],
  );
  const isFavourite = (id) => {
    return favouriteIds.has(id);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
