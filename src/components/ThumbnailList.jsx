import { ThumbnailCard } from "./ThumbnailCard";

export const ThumbnailList = ({ arr }) => {
  return (
    <div
      className="mt-4 mx-auto
                flex flex-wrap gap-3 items-stretch justify-center
                w-full "
    >
      {arr.map((r) => {
        return (
          <div key={r.idMeal} className="flex basis-[250px] grow max-w-[30%]">
            <ThumbnailCard recipe={r} />
          </div>
        );
      })}
    </div>
  );
};
