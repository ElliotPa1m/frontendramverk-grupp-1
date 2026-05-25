import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Rating } from "./Rating";
import { useLocation } from "react-router-dom";

export const RecipeCardInfoSection = ({ recipe }) => {
  const page = useLocation().pathname;
  const { idMeal, strMeal, strCountry, rating } = recipe;
  const titleToShow = (text) => {
    const trimSize =
      window.innerWidth <= 600
        ? 17
        : window.innerWidth > 1000 && page === "/"
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
      <div className="mx-2 sm:mx-4 my-1 flex flex-1 flex-col gap-1">
        <h2 className="barlow-condensed-regular text-md sm:text-lg">
          {titleToShow(strMeal)}
        </h2>
      </div>
      {rating && (
        <div className="px-4 mb-2 hidden sm:inline-block">
          <Rating rating={rating} />
        </div>
      )}
      <div className="mt-auto flex justify-between items-center bg-card-pop px-2 sm:px-4 rounded m-1">
        <span className="barlow-condensed-light text-xs hidden sm:inline-block">
          {strCountry && strCountry}
        </span>
        <Link
          to={`/recipe/${idMeal}`}
          className="barlow-condenced-light text-sm text-end block my-2 ms-auto"
        >
          <span className="barlow-condensed-light text-xs">
            READ MORE <Icon icon={"arrowRight"} />
          </span>
        </Link>
      </div>
    </>
  );
};
