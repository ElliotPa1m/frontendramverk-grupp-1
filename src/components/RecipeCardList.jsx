import { useLocation } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { ThumbnailCard } from "./ThumbnailCard";
import { useLayoutEffect, useRef, useState } from "react";

export const RecipeCardList = ({ arr }) => {
  const parentRef = useRef(null | 0);
  const [parentWidth, setParentWidth] = useState(0);
  const page = useLocation().pathname;

  useLayoutEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, []);
  const amountOfCardsToShow = Math.floor(
    ((parentWidth > 1250 ? 1250 : parentWidth) - 15) / 275,
  );
  return (
    <div
      ref={parentRef}
      className={`mt-4 mx-auto gap-3 ${
        page === "/"
          ? `flex flex-wrap items-stretch w-full justify-center`
          : `grid max-w-full lg:max-w-[1250px] justify-items-between ${arr.length >= amountOfCardsToShow && page !== "/my-recipes" ? "justify-center" : ""}
            grid-cols-[repeat(auto-fit,minmax(47%,47%))]
            sm:grid-cols-[repeat(auto-fit,minmax(250px,24%))]`
      } `}
    >
      {(page === "/my-recipes" ? arr.slice(0, amountOfCardsToShow) : arr).map(
        (r) => {
          const id = r.id ? r.id : r.idMeal;
          return (
            <div
              key={id}
              className={`flex
            ${
              page === "/"
                ? `basis-w-[300px] grow max-w-[30%] lg:max-w-[400px]`
                : `w-full`
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
        },
      )}
    </div>
  );
};
