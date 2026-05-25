import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Rating } from "./Rating";

export const RecipeCardInfoSection = ({ recipe }) => {
  const { idMeal, strMeal, strCountry, rating } = recipe;
  const titleToShow = (text) => {
    if (text === undefined) return text;
    if (text.length <= 20) return text;

    const trimmed = text.slice(0, 20);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + "...";
  };

  return (
    <div>
      <div className="mx-4 my-2 flex flex-1 flex-col gap-1">
        <h2 className="barlow-condensed-regular text-xl">
          {titleToShow(strMeal)}
        </h2>
      </div>
      <div className="mt-auto flex justify-between items-center bg-background px-4 rounded m-1">
        {rating ? (
          <Rating rating={rating} />
        ) : (
          <span className="barlow-condensed-light text-xs">
            {strCountry && strCountry}
          </span>
        )}
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
