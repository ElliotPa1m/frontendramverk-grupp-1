import { Rating } from "./Rating";

export const RecipeCardInfoSection = ({ recipeName, dietary, rating }) => {
  return (
    <div className="mx-4 mt-4 mb-2 flex flex-col gap-1">
      <h3 className="text-sm">{dietary.flags.map((d) => d).join(" • ")}</h3>
      <h2 className="text-xl">{recipeName}</h2>
      <div className="flex justify-between">
        <Rating rating={rating} />
        <span className="text-sm">read more →</span>
      </div>
    </div>
  );
};
