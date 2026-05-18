import { Icon } from "./Icon";
import { Rating } from "./Rating";

export const RecipeCardInfoSection = ({ recipeName, info, rating }) => {
  return (
    <div className="mx-4 mt-4 mb-2 flex flex-col gap-1">
      <h3 className="barlow-condensed-regular text-sm">{info}</h3>
      <h2 className="barlow-condensed-regular text-xl">{recipeName}</h2>
      <div className="flex justify-between">
        <Rating rating={rating} />
        <span className="barlow-condensed-light text-sm">
          read more <Icon icon={"arrowRight"} />
        </span>
      </div>
    </div>
  );
};
