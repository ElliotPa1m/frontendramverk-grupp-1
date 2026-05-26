import { IconButton } from "./IconButton";
import { useRecipes } from "../contexts/RecipesContext";

export const FavoriteButton = ({ recipe }) => {
  const id = recipe.idMeal;
  const recipeContext = useRecipes();
  const isFav = recipeContext.isFavourite(id);
  return (
    <>
      <IconButton
        icon={isFav ? "favorite" : "notFavorite"}
        actionHandler={() =>
          isFav
            ? recipeContext.removeFavourite(id)
            : recipeContext.addFavourite(recipe)
        }
      />
    </>
  );
};
