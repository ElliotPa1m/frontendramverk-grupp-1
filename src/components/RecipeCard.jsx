import { useState } from "react";
import { Image } from "./Image";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";
import { EditRecipeModal } from "./EditRecipeModal";
import { deleteUserRecipe } from "../services/userRecipeService";
import { recipeReconstructor } from "../utils/recipeReconstructor";

export const RecipeCard = ({ recipe, onEditSuccess }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New Edit Modal state!
  const created = recipe.createdAt ? true : false;
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
        <div className="absolute top-2 right-2">
          {created ? (
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

      {/* The Portal Modal */}
      {isEditModalOpen && (
        <EditRecipeModal
          recipe={recipe}
          onClose={() => setIsEditModalOpen(false)}
          onSaveSuccess={onEditSuccess} // Pass a refresh trigger up to the parent page!
        />
      )}
    </div>
  );
};
