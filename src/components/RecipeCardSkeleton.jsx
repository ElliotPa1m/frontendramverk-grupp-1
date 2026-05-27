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
    <div
      className="border border-2 border-pop rounded-md 
                    overflow-hidden bg-white
                    w-full
                    h-full 
                    flex flex-col animate-pulse"
    >
      {/* image placeholder */}
      <div className="w-full aspect-square bg-gray-300" />
    </div>
  );
};

// Use this list as a placeholder while RecipeCardList loads.
export const RecipeCardSkeletonList = ({ count = 10 }) => {
  const page = useLocation().pathname;
  return (
    <div
      className={`mt-4 mx-auto gap-3 justify-center ${
        page === "/"
          ? `flex flex-wrap items-stretch w-full`
          : `grid max-w-screen lg:max-w-[1250px]justify-items-start
            grid-cols-[repeat(auto-fit,minmax(47%,47%))]
            sm:grid-cols-[repeat(auto-fit,260px)]`
      } `}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex w-[260px]">
          <RecipeCardSkeleton />
        </div>
      ))}
    </div>
  );
};
