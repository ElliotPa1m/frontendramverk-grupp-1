import { useLocation } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { ThumbnailCard } from "./ThumbnailCard";

export const RecipeCardList = ({ arr, onEditSuccess }) => {
  const page = useLocation().pathname;
  return (
    <div
      className={`mt-4 mx-auto justify-center gap-3 ${
        page === "/"
          ? `flex flex-wrap items-stretch w-full}`
          : `grid max-w-[1250px]
            grid-cols-[repeat(auto-fit,minmax(47%,1fr))]
            sm:grid-cols-[repeat(auto-fit,260px)]`
      } `}
    >
      {arr.map((r) => {
        const id = r.id ? r.id : r.idMeal;
        return (
          <div
            key={id}
            className={`flex
            ${
              page === "/"
                ? `basis-w-[300px] grow max-w-[30%] lg:max-w-[400px]`
                : `w-full sm:w-[260px]`
            }`}
          >
            {page === "/" ? (
              <>
                <div className="block sm:hidden">
                  <ThumbnailCard recipe={r} />
                </div>
                <div className="hidden sm:block">
                  <RecipeCard recipe={r} onEditSuccess={onEditSuccess} />
                </div>
              </>
            ) : (
              <RecipeCard 
                recipe={r}
                onEditSuccess={onEditSuccess} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
