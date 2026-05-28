import { RecipeCardList } from "../components/RecipeCardList";
import { useRecipes } from "../contexts/RecipesContext";
import { ParagraphComp } from "../components/ParagraphComp";
import { HeadingComp } from "../components/HeadingComp";

export const AllFavoriteRecipePage = () => {
  const recipeContext = useRecipes();

  return (
    <div className="m-4 px-4 min-w-[90%] max-w-[1250px] mx-auto">
      <HeadingComp text={"Favorites"} size={"h2"} />
      {recipeContext.favourites.length !== 0 ? (
        <RecipeCardList arr={recipeContext.favourites} />
      ) : (
        <ParagraphComp text={"You dont have any favorites yet"} />
      )}
    </div>
  );
};
