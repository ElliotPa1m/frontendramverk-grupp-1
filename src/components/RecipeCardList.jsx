import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({ arr }) => {
  return (
    <div
      className="mt-4 mx-auto
                flex flex-wrap gap-3 items-stretch justify-center
                w-full max-w-[1250px]"
    >
      {arr.map((r) => {
        const id = r.id ? r.id : r.idMeal;
        return (
          <div
            key={id}
            className="flex basis-[250px] grow max-w-[300px] lg:max-w-[400px]"
          >
            <RecipeCard recipe={r} rating={r.rating} />
          </div>
        );
      })}
    </div>
  );
};
