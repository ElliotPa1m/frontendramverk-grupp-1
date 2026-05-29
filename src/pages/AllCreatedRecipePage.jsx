import { RecipeCardList } from "../components/RecipeCardList";
import { getUserRecipes } from "../services/userRecipeService";
import { ParagraphComp } from "../components/General/ParagraphComp";
import { HeadingComp } from "../components/General/HeadingComp";
import { createdMockRecipeArr } from "../data/mockData/createdRecipeMockData";

export const AllCreatedRecipePage = () => {
  const devEnv = import.meta.env.VITE_APP_ENV ?? "prod";

  const userRecipes = getUserRecipes();
  const recipeArr =
    devEnv === "dev"
      ? userRecipes.length !== 0
        ? userRecipes
        : createdMockRecipeArr
      : userRecipes;

  return (
    <div className="mx-4 my-4">
      <HeadingComp text={"My Created Recipes"} size={"h2"} />
      {recipeArr.length !== 0 ? (
        <RecipeCardList arr={recipeArr} />
      ) : (
        <ParagraphComp text={"You have not created any recipes yet"} />
      )}
    </div>
  );
};
