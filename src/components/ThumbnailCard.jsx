import { Image } from "./Image";

export const ThumbnailCard = ({ recipe }) => {
  return (
    <div
      className="border border-2 border-pop rounded-md 
                    overflow-hidden bg-background
                    w-full
                    h-full 
                    flex flex-col"
    >
      <div className="relative">
        <Image imgUrl={recipe.strMealThumb} recipeName={recipe.strMeal} />
        <h2 className="barlow-condensed-regular text-sm mx-1">
          {recipe.strMeal}
        </h2>
      </div>
    </div>
  );
};
