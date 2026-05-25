import { useState } from "react";
import { Image } from "./Image";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe }) => {
  const [setIsEditModalOpen, setIsEditModalOpen] = useState(false); // New Edit Modal state!
  const created = recipe.createdAt ? true : false;

  const recipeToShow = {
    idMeal: created ? recipe.id : recipe.idMeal,
    strMeal: created ? recipe.title : recipe.strMeal,
    strMealThumb: created ? recipe.imageUrl : recipe.strMealThumb,
    strCountry: created ? recipe.area : recipe.strCountry,
    strTags: created
      ? recipe.tags?.length
        ? recipe.tags.toString()
        : ""
      : recipe.strTags,
    strCategory: created ? recipe.category : recipe.strCategory,
    rating: recipe.rating,
  };

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
          {created ? (
            <IconButton
              icon={"edit"}
              actionHandler={() => setIsEditModalOpen(true)}
            />
          ) : (
            <FavoriteButton id={recipeToShow.idMeal} recipe={recipeToShow} />
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
