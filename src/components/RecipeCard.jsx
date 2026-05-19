import { Image } from "./Image";
// import { IconWithInfo } from "./IconWithInfo";
import { IconButton } from "./IconButton";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe, rating }) => {
  const created = true;
  return (
    <div
      className="border border-2 border-stone-500 rounded-md 
                    overflow-hidden bg-amber-50 
                    w-full
                    h-full 
                    flex flex-col"
    >
      <div className="relative">
        <Image imgUrl={recipe.strMealThumb} recipeName={recipe.strMeal} />
        <div className="absolute top-2 right-3">
          {created ? (
            <IconButton
              icon={"edit"}
              actionHandler={() => console.log("clicked")}
            />
          ) : (
            <FavoriteButton id={recipe.idMeal} recipe={recipe} />
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
        id={recipe.idMeal}
        recipeName={recipe.strMeal}
        country={recipe.strCountry}
        tags={recipe.strTags}
        cat={recipe.strCategory}
        rating={rating}
      />
    </div>
  );
};
