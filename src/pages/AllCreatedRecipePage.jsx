import { RecipeCardList } from "../components/RecipeCardList";
import { getUserRecipes } from "../services/userRecipeService";
import { mockRecipeArr } from "../utils/mockData";
import { StandardPComp } from "../components/StandardPComp";

export const AllCreatedRecipePage = () => {
  const devEnv = import.meta.env.VITE_APP_ENV ?? "prod";

  const userRecipes = getUserRecipes();
  const recipeArr =
    devEnv === "dev"
      ? userRecipes.length !== 0
        ? userRecipes
        : mockRecipeArr
      : userRecipes;

  return (
    <div className="mx-4 my-4">
      <h2 className="barlow-condensed-regular text-2xl text-text">
        My Created Recipes
      </h2>
      {recipeArr.length !== 0 ? (
        <RecipeCardList arr={recipeArr} />
      ) : (
        <StandardPComp text={"You have not created any recipes yet"} />
      )}
    </div>
  );
};
