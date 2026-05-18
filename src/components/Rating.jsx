import { Icon } from "./Icon";

export const Rating = ({ rating }) => {
  const rounded = Math.round(rating * 2) / 2;

  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill("filledStar"),
    ...(hasHalfStar ? ["halfStar"] : []),
    ...Array(emptyStars).fill("emptyStar"),
  ];

  return (
    <>
      <div className="flex items-center gap-1 text-xs">
        <div className="flex items-center">
          {stars.map((star, index) => (
            <Icon key={index} icon={star} />
          ))}
        </div>
        <span className="barlow-condensed-light">({rating})</span>
      </div>
    </>
  );
};
