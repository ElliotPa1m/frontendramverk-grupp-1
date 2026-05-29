import { Link } from "react-router-dom";
import { Image } from "./General/Image";

export const ThumbnailCard = ({ recipe }) => {
  return (
    <div
      className="border border-2 border-pop rounded-md 
                    overflow-hidden bg-background
                    w-full
                    h-full 
                    flex flex-col"
    >
      <Link to={`/recipe/${recipe.idMeal}`}>
        <div className="relative">
          <Image imgUrl={recipe.strMealThumb} recipeName={recipe.strMeal} />
        </div>
      </Link>
    </div>
  );
};
