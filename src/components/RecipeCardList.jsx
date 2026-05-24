import { useLocation } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { ThumbnailCard } from "./ThumbnailCard";

export const RecipeCardList = ({ arr }) => {
  const page = useLocation().pathname;
  return (
    <div
      className={`mt-4 mx-auto
                flex flex-wrap gap-3 items-stretch justify-center w-full
      ${page !== "/" && `max-w-[1250px]`}`}
    >
      {arr.map((r) => {
        const id = r.id ? r.id : r.idMeal;
        return (
          <div
            key={id}
            className={`flex basis-[250px] grow 
            ${page === "/" ? `max-w-[30%]` : `max-w-[300px] lg:max-w-[400px]`}`}
          >
            {page === "/" ? (
              <>
                <div className="block sm:hidden">
                  <ThumbnailCard recipe={r} />
                </div>
                <div className="hidden sm:block">
                  <RecipeCard recipe={r} />
                </div>
              </>
            ) : (
              <RecipeCard recipe={r} />
            )}
          </div>
        );
      })}
    </div>
  );
};
