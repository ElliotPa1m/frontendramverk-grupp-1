import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Rating } from "./Rating";
import { useLocation } from "react-router-dom";

export const RecipeCardInfoSection = ({ recipe }) => {
  const page = useLocation().pathname;
  const { idMeal, strMeal, strArea, rating } = recipe;
  const titleToShow = (text) => {
    const trimSize =
      window.innerWidth <= 600
        ? 17
        : window.innerWidth > 1000 && page === "/"
          ? 35
          : window.innerWidth > 1500 && page === "/"
            ? 40
            : 26;
    if (text === undefined) return text;
    if (text.length <= trimSize) return text;

    const trimmed = text.slice(0, trimSize);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + "...";
  };

  return (
    <>
      <div className="m-2 flex flex-col gap-1">
        <h2 className="barlow-condensed-regular text-md sm:text-lg">
          {titleToShow(strMeal)}
        </h2>
        {rating && (
          <div className="mb-1 hidden sm:inline-block">
            <Rating rating={rating} />
          </div>
        )}
      </div>
      <div className="mt-auto flex justify-between items-center bg-card-pop px-2 sm:px-2 rounded m-1">
        <span className="barlow-condensed-light text-xs hidden sm:inline-block">
          {strArea && strArea}
        </span>
        <Link
          to={`/recipe/${idMeal}`}
          className="barlow-condenced-light text-sm text-end block my-1 ms-auto"
        >
          <span className="barlow-condensed-light text-xs">
            RECIPE <Icon icon={"arrowRight"} />
          </span>
        </Link>
      </div>
    </>
  );
};
