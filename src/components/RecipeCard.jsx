import { Image } from "./Image";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";
import { deleteUserRecipe } from "../services/userRecipeService";
import { recipeReconstructor } from "../utils/recipeReconstructor";
import {isCreated } from "../contexts/RecipesContext";

export const RecipeCard = ({ recipe }) => {
  const recipeToShow = recipeReconstructor(recipe);

  return (
    <div
      className="border border-1 border-pop rounded-md 
                    overflow-hidden bg-card-bg
                    w-full
                    h-full 
                    flex flex-col"
    >
      <div className="relative">
        <Image
          imgUrl={recipeToShow.strMealThumb}
          recipeName={recipeToShow.strMeal}
        />
        <div className="absolute top-2 right-3">
          {isCreated(recipe) ? (
            <div className="flex gap-2">
              <IconButton
                icon={"edit"}
                actionHandler={() =>
                  console.log("go to created recipe editing screen")
                }
              />
              <IconButton
                icon={"delete"}
                actionHandler={() => deleteUserRecipe(recipe.id)}
              />
            </div>
          ) : (
            <FavoriteButton recipe={recipeToShow} />
          )}
        </div>
      </div>
      <RecipeCardInfoSection recipe={recipeToShow} />
    </div>
  );
};
