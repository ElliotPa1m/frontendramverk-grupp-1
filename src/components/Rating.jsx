export const Rating = ({ rating }) => {
  const generateStars = (r) => {
    const rounded = Math.round(r * 2) / 2;

    const fullStars = Math.floor(rounded);
    const halfStar = rounded % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars)
    );
  };
  return (
    <>
      <div className="flex items-center">
        {generateStars(rating)} <span className="text-xs">({rating})</span>
      </div>
    </>
  );
};
