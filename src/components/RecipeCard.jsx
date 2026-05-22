import { Image } from "./Image";
// import { IconWithInfo } from "./IconWithInfo";
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
    strTags: created ? recipe.tags.toString() : recipe.strTags,
    strCategory: created ? recipe.category : recipe.strCategory,
    rating: recipe.rating,
  };

  return (
    <div
      className="border border-2 border-pop rounded-md 
                    overflow-hidden bg-background
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

        {/* <div className="absolute bottom-2 left-3">
          <IconWithInfo
            icon={"time"}
            timeToCook={recipe.prep_time + recipe.cook_time}
          />
        </div> */}
      </div>
      <RecipeCardInfoSection
        id={recipeToShow.idMeal}
        recipeName={recipeToShow.strMeal}
        country={recipeToShow.strCountry}
        tags={recipeToShow.strTags}
        cat={recipeToShow.strCategory}
        rating={recipeToShow.rating}
      />
    </div>
  );
};
