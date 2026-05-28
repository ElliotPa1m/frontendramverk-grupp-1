import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/*

A skeleton card(list) to be used as placeholder while recipeCard content loads. RecipeCardSkeletonList('desired number of cards').

don't really think it makes any sense to separete these two components into their own files. I'm ready to take the backlash för this decision ;) */

// One placeholder card based off RecipeCard
export const RecipeCardSkeleton = () => {
  return (
    <div
      className=" rounded-md
                    overflow-hidden bg-white
                    w-full h-full flex flex-col animate-pulse"
    >
      {/* image placeholder */}
      <div className="w-full aspect-square bg-gray-300" />

      {/* info section placeholder */}
      <div className="mx-4 mt-4 mb-4 flex flex-1 flex-col gap-3 min-h-12">
        <div className="h-3 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-full rounded bg-gray-300" />
        {/* <div className="h-3 w-2/3 rounded bg-gray-300" /> */}
      </div>
    </div>
  );
};

export const ThumbnailCardSkeleton = () => {
  return (
    <div className="w-full aspect-square rounded-md bg-gray-300 animate-pulse"></div>
  );
};

// Use this list as a placeholder while RecipeCardList loads.
export const RecipeCardSkeletonList = ({ count = 10 }) => {
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
          : `grid max-w-full lg:max-w-[1250px] justify-items-between ${count >= amountOfCardsToShow ? "justify-center" : ""}
            grid-cols-[repeat(auto-fit,minmax(47%,47%))]
            sm:grid-cols-[repeat(auto-fit,minmax(250px,24%))]`
      } `}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`flex
            ${
              page === "/"
                ? `basis-w-[300px] grow max-w-[30%] lg:max-w-[400px]`
                : `w-full`
            }`}
        >
          {page === "/" ? (
            window.innerWidth <= 768 ? (
              <ThumbnailCardSkeleton />
            ) : (
              <RecipeCardSkeleton />
            )
          ) : (
            <RecipeCardSkeleton />
          )}
        </div>
      ))}
    </div>
  );
};
