import { useLocation } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { ThumbnailCard } from "./ThumbnailCard";

export const RecipeCardList = ({ arr }) => {
  const page = useLocation().pathname;
  return (
    <div
      className={`mt-4 mx-auto justify-center gap-3 ${
        page === "/"
          ? `flex flex-wrap items-stretchw-full}`
          : `grid max-w-[1250px]
            grid-cols-[repeat(auto-fit,260px)]`
      } `}
    >
      {arr.map((r) => {
        const id = r.id ? r.id : r.idMeal;
        return (
          <div
            key={id}
            className={`flex 
            ${page === "/" ? `w-[30%]` : `w-[260px]`}`}
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
