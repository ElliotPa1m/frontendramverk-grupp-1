import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";
import { getUserRecipes } from "../services/userRecipeService";

export const CreatedFavoritePage = () => {
  const favContext = useFavorites();
  const createdRecipes = getUserRecipes();

  return (
    <div className="mx-4 mt-4">
      <h2 className="barlow-condensed-regular text-2xl">Created recepies</h2>
      <RecipeCardList arr={createdRecipes} />
      <hr className="my-4" />
      <h2 className="barlow-condensed-regular text-2xl">Favorites</h2>
      {favContext.favourites.length !== 0 ? (
        <RecipeCardList arr={favContext.favourites} />
      ) : (
        <p>You dont have any favorites yet</p>
      )}
    </div>
  );
};
