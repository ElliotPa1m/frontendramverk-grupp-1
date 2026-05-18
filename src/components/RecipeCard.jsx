import { Image } from "./Image";
import { IconWithInfo } from "./IconWithInfo";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";

export const RecipeCard = ({ recipe, rating }) => {
  return (
    <div className="border border-2 border-stone-500 rounded-md overflow-hidden min-w-fit max-w-70 bg-amber-50">
      <div className="relative">
        <Image imgUrl={recipe.image} recipeName={recipe.name} />
        <div className="absolute top-2 right-3">
          <FavoriteButton />
        </div>

        <div className="absolute bottom-2 left-3">
          <IconWithInfo icon={"time"} timeToCook={recipe.meta.total_time} />
        </div>
      </div>
      <RecipeCardInfoSection
        recipeName={recipe.name}
        dietary={recipe.dietary}
        rating={rating}
      />
    </div>
  );
};
