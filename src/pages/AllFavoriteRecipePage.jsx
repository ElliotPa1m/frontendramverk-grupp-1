import { RecipeCardList } from "../components/RecipeCardList";
import { useRecipes } from "../contexts/RecipesContext";
import { ParagraphComp } from "../components/ParagraphComp";
import { HeadingComp } from "../components/HeadingComp";

export const AllFavoriteRecipePage = () => {
  const recipeContext = useRecipes();

  return (
    <div className="mx-4 my-4">
      <HeadingComp text={"Favorites"} size={"h2"} />
      {recipeContext.favourites.length !== 0 ? (
        <RecipeCardList arr={recipeContext.favourites} />
      ) : (
        <ParagraphComp text={"You dont have any favorites yet"} />
      )}
    </div>
  );
};
