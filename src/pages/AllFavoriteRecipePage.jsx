import { RecipeCardList } from "../components/CardRelated/RecipeCardList";
import { useRecipes } from "../contexts/RecipesContext";
import { ParagraphComp } from "../components/General/ParagraphComp";
import { HeadingComp } from "../components/General/HeadingComp";

export const AllFavoriteRecipePage = () => {
  const recipeContext = useRecipes();

  return (
    <div className="m-4 px-4 w-[100vw] max-w-[1250px] mx-auto">
      <HeadingComp text={"Favorites"} size={"h2"} />
      {recipeContext.favourites.length !== 0 ? (
        <RecipeCardList arr={recipeContext.favourites} />
      ) : (
        <ParagraphComp text={"You dont have any favorites yet"} />
      )}
    </div>
  );
};
