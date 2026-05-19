import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({ arr }) => {
  // eslint-disable-next-line react-hooks/purity
  const createRating = () => (Math.random() * 5).toFixed(1);
  return (
    <div
      className="mt-4 mx-auto
                flex flex-wrap gap-3 items-stretch justify-center
                w-full max-w-[1250px]"
    >
      {arr.map((r) => {
        return (
          <div key={r.idMeal} className="flex basis-[250px] grow max-w-[400px]">
            <RecipeCard
              recipe={r}
              rating={r.rating ? r.rating : createRating()}
            />
          </div>
        );
      })}
    </div>
  );
};
