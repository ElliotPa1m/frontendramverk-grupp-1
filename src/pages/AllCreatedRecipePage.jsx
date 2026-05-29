import { RecipeCardList } from "../components/RecipeCardList";
import { getUserRecipes } from "../services/userRecipeService";
import { ParagraphComp } from "../components/ParagraphComp";
import { HeadingComp } from "../components/HeadingComp";
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
    <div className="m-4 px-4 w-[100vw] max-w-[1250px] mx-auto">
      <HeadingComp text={"My Created Recipes"} size={"h2"} />
      {recipeArr.length !== 0 ? (
        <RecipeCardList arr={recipeArr} />
      ) : (
        <ParagraphComp text={"You have not created any recipes yet"} />
      )}
    </div>
  );
};
