import { useState } from "react";
import { Image } from "./General/Image";
import { IconButton } from "./General/IconButton";
import { FavoriteButton } from "./General/FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";
import { EditRecipeModal } from "./EditRecipeModal";
import { recipeReconstructor } from "../utils/recipeReconstructor";
import { useRecipes } from "../contexts/RecipesContext";
import { ConfirmDeletionModal } from "./ConfirmDeletionModal";

// Prop drilling with onEditSuccess is not needed anymore thanks to the new RecipesContext!
export const RecipeCard = ({ recipe }) => {
  // The single source of truth for modal visibility "" | "EDIT" | "DELETE"
  const [currentlyOpenModal, setCurrentlyOpenModal] = useState("");

  const created = recipe.createdAt ? true : false; // Intentionally uses the clean boolean check instead of the scrapped isCreated context function
  const recipeToShow = recipeReconstructor(recipe);
  const { removeCreated } = useRecipes();

  // Helper to keep the JSX clean
  const closeModal = () => setCurrentlyOpenModal("");

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
                actionHandler={() => setCurrentlyOpenModal("EDIT")}
              />
              <IconButton
                icon={"delete"}
                actionHandler={
                  () => setCurrentlyOpenModal("DELETE") // Open the ConfirmDeletion modal instead of Thanos snapping it haha
                }
              />
            </div>
          ) : (
            <FavoriteButton recipe={recipeToShow} />
          )}
        </div>
      </div>
      <RecipeCardInfoSection recipe={recipeToShow} />

      {/* The Portal Modals, now strictly mutually exclusive */}
      {currentlyOpenModal === "EDIT" && (
        <EditRecipeModal
          recipe={recipe}
          onClose={closeModal} // Use our new helper function!
          // onSaveSuccess={onEditSuccess} // "Pass a refresh trigger up to the parent page!" Not needed anymore!
        />
      )}

      {currentlyOpenModal === "DELETE" && (
        <ConfirmDeletionModal
          recipeName={recipeToShow.strMeal}
          onClose={closeModal}
          onConfirm={() => removeCreated(recipe.id)} // Pass the context action as a prop
        />
      )}
    </div>
  );
};
