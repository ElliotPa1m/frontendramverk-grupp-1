import { Image } from "./Image";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe }) => {
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
              actionHandler={() =>
                console.log("go to created recipe editing screen")
              }
            />
          ) : (
            <FavoriteButton recipe={recipeToShow} />
          )}
        </div>
      </div>
      <RecipeCardInfoSection recipe={recipeToShow} />
    </div>
  );
};
