

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
      <div className="mx-4 mt-4 mb-4 flex flex-1 flex-col gap-3 min-h-20">
        <div className="h-3 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-full rounded bg-gray-300" />
        <div className="h-3 w-2/3 rounded bg-gray-300" />
      </div>
    </div>
  );
};

// Use this list as a placeholder while RecipeCardList loads.
export const RecipeCardSkeletonList = ({ count = 10 }) => {
  return (
    <div
      className="mt-4 mx-auto
                flex flex-wrap gap-3 items-stretch justify-center
                w-full max-w-[1250px]"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex basis-[250px] grow max-w-[300px] lg:max-w-[400px]"
        >
          <RecipeCardSkeleton />
        </div>
      ))}
    </div>
  );
};
