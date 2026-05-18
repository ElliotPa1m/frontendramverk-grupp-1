import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({ arr }) => {
  // eslint-disable-next-line react-hooks/purity
  const createRating = () => (Math.random() * 5).toFixed(1);
  return (
    <div className="mt-4 flex flex-wrap gap-4 justify-center">
      {arr.map((r) => {
        return (
          <div key={r.idMeal}>
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
