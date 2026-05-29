import { IconButton } from "./IconButton";
import { useRecipes } from "../../contexts/RecipesContext";

export const FavoriteButton = ({ recipe }) => {
  const id = recipe.idMeal;
  const recipeContext = useRecipes();
  const isFav = recipeContext.isFavourite(id);
  return (
    <>
      <IconButton
        icon={isFav ? "favorite" : "notFavorite"}
        buttonClassName="transition-transform duration-100 active:scale-125"
        actionHandler={() =>
          isFav
            ? recipeContext.removeFavourite(id)
            : recipeContext.addFavourite(recipe)
        }
      />
    </>
  );
};
