import { Image } from "./Image";
// import { IconWithInfo } from "./IconWithInfo";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe }) => {
  const created = recipe.createdAt ? true : false;
  const recipeToShow = {
    id: created ? recipe.id : recipe.idMeal,
    recipeName: created ? recipe.title : recipe.strMeal,
    thumbnail: created ? recipe.imageUrl : recipe.strMealThumb,
    country: created ? recipe.area : recipe.strCountry,
    tags: created ? recipe.tags : recipe.strTags,
    cat: created ? recipe.category : recipe.strCategory,
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
          imgUrl={recipeToShow.thumbnail}
          recipeName={recipeToShow.recipeName}
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
            <FavoriteButton id={recipeToShow.id} recipe={recipeToShow} />
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
        id={recipeToShow.id}
        recipeName={recipeToShow.recipeName}
        country={recipeToShow.country}
        tags={recipeToShow.tags}
        cat={recipeToShow.cat}
        rating={recipeToShow.rating}
      />
    </div>
  );
};
