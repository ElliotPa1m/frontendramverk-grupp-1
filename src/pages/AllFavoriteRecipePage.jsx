import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";

export const AllFavoriteRecipePage = () => {
  const favContext = useFavorites();

  return (
    <div className="mx-4 mt-4">
      <h2 className="barlow-condensed-regular text-2xl">Favorites</h2>
      {favContext.favourites.length !== 0 ? (
        <RecipeCardList arr={favContext.favourites} />
      ) : (
        <p>You dont have any favorites yet</p>
      )}
    </div>
  );
};
