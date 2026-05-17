import { createContext, useContext, useState, useEffect, useMemo } from 'react';

/*----------------------------------------------/ 
/                                               /
/           FavouritesContext (draft)           /     
/                                               /
/----------------------------------------------*/

//*This implementation assumes we follow the data flow diagram draft.

const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  // Initialises 'favourites' state from local storage if existing, otherwise starts as [].
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });

  // syncs changes to favourties with local storage
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = recipe => {
    setFavourites(prev => [...prev, recipe]);
  };

  const removeFavourite = id => {
    setFavourites(prev => prev.filter(recipe => recipe.id !== id));
  };

  // useMemo maps and caches a set of recipe IDs for faster 'isFavourite'-look up. the set is only recalculated when [favourites] change.
  const favouriteIds = useMemo(
    () => new Set(favourites.map(recipe => recipe.id)),
    [favourites],
  );

  const isFavourite = id => {
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

// TEMP COMMENT - if i understand "hooks" correctly this should give us a custom hook that allows us to just import 'useFavorites' instead of both 'useContext' and 'FavouritesContext'.

export const useFavourites = () => useContext(FavouritesContext);
