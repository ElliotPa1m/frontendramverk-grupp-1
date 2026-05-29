import { useLocation } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { ThumbnailCard } from "../CardRelated/ThumbnailCard";

export const RecipeCardList = ({ arr }) => {
  const page = useLocation().pathname;
  return (
    <div
      className={`mt-4 mx-auto gap-3
  ${
    page === "/"
      ? `flex flex-wrap items-stretch justify-center w-full`
      : `grid max-w-screen lg:max-w-[1360px] justify-items-start
         grid-cols-[repeat(auto-fit,minmax(47%,47%))]
         sm:grid-cols-[repeat(auto-fit,260px)]`
  }`}
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
                : `w-full sm:w-[260px] self-start`
            }`}
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
