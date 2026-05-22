import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Rating } from "./Rating";

export const RecipeCardInfoSection = ({ recipe }) => {
  const { idMeal, strMeal, strCountry, strCategory, strTags, rating } = recipe;
  const tagArr = strTags && strTags.split(",").join(" • ");
  return (
    <div className="mx-4 mt-4 mb-2 flex flex-1 flex-col gap-1">
      {(strCountry || strCategory) && (
        <h3 className="barlow-condensed-regular text-sm">
          {strCountry} {strCountry && strCategory && "| " + strCategory}
        </h3>
      )}
      {tagArr && <h3 className="barlow-condensed-regular text-sm">{tagArr}</h3>}
      <h2 className="barlow-condensed-regular text-xl">{strMeal}</h2>
      <div className="mt-auto flex justify-between">
        {rating && <Rating rating={rating} />}
        <Link
          to={`/recipe/${idMeal}`}
          className="barlow-condenced-light text-sm text-end block my-2 ms-auto"
        >
          <span className="barlow-condensed-light text-xs">
            READ MORE <Icon icon={"arrowRight"} />
          </span>
        </Link>
      </div>
    </div>
  );
};
