import { createContext, useContext, useState, useEffect } from 'react';

/*----------------------------------------------/ 
/                                               /
/           FavouritesContext - DRAFT           /     
/                                               /
/----------------------------------------------*/

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

  //TEMP COMMENT -  this solution for "looking up favourites to render those recipe cards differently" is probably fine for our scope but I'm looking into a more "best practice solution"
  const isFavourite = id => {
    return favourites.some(recipe => recipe.id === id);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  };

  return <FavouritesContext.Provider value={value}>
    {children}
  </FavouritesContext.Provider>
 
};

// TEMP COMMENT - if i understand "hooks" correctly this should give us a custom hook that allows us to just import 'useFavorites' instead of both 'useContext' and 'FavouritesContext'.

export const useFavourites = () => useContext(FavouritesContext);



