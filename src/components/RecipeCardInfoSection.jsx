import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Rating } from "./Rating";

export const RecipeCardInfoSection = ({
  id,
  recipeName,
  country,
  cat,
  tags,
  rating,
}) => {
  const tagArr = tags && tags.split(",").join(" • ");
  return (
    <div className="mx-4 mt-4 mb-2 flex flex-1 flex-col gap-1">
      <h3 className="barlow-condensed-regular text-sm">
        {country} | {cat}
        {tagArr && <br />}
        {tagArr && tagArr}
      </h3>
      <h2 className="barlow-condensed-regular text-xl">{recipeName}</h2>
      <div className="mt-auto flex justify-between">
        <Rating rating={rating} />
        <Link
          to={`/recipe/:${id}`}
          className="barlow-condenced-light text-sm text-end block my-2"
        >
          <span className="barlow-condensed-light text-xs">
            READ MORE <Icon icon={"arrowRight"} />
          </span>
        </Link>
      </div>
    </div>
  );
};
