import { IconButton } from "./IconButton";
import { useRecipes } from "../contexts/RecipesContext";

export const FavoriteButton = ({ recipe }) => {
  const id = recipe.idMeal;
  const favContext = useFavorites();
  const isFav = favContext.isFavourite(id);
  return (
    <>
      <IconButton
        icon={isFav ? "favorite" : "notFavorite"}
        actionHandler={() =>
          isFav
            ? favContext.removeFavourite(id)
            : favContext.addFavourite(recipe)
        }
      />
    </>
  );
};
