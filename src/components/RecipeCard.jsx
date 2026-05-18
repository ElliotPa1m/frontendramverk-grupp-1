import { Image } from "./Image";
// import { IconWithInfo } from "./IconWithInfo";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe, rating }) => {
  return (
    <div className="border border-2 border-stone-500 rounded-md overflow-hidden w-fit max-w-[300px] bg-amber-50">
      <div className="relative">
        <Image imgUrl={recipe.strMealThumb} recipeName={recipe.strMeal} />
        <div className="absolute top-2 right-3">
          <FavoriteButton />
        </div>

        {/* <div className="absolute bottom-2 left-3">
          <IconWithInfo
            icon={"time"}
            timeToCook={recipe.prep_time + recipe.cook_time}
          />
        </div> */}
      </div>
      <RecipeCardInfoSection
        recipeName={recipe.strMeal}
        info={recipe.strCountry}
        rating={rating}
      />
    </div>
  );
};
