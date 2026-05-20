import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";
import { StandardPComp } from "../components/StandardPComp";

export const AllFavoriteRecipePage = () => {
  const favContext = useFavorites();

  return (
    <div className="mx-4 my-4">
      <h2 className="barlow-condensed-regular text-2xl">Favorites</h2>
      {favContext.favourites.length !== 0 ? (
        <RecipeCardList arr={favContext.favourites} />
      ) : (
        <StandardPComp text={"You dont have any favorites yet"} />
      )}
    </div>
  );
};
