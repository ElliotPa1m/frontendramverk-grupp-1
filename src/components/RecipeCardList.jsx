import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({ arr }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4 justify-center">
      {arr.map((r) => {
        return (
          <div key={r.recipe.id}>
            <RecipeCard recipe={r.recipe} rating={r.rating} />
          </div>
        );
      })}
    </div>
  );
};
