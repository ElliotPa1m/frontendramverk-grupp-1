export const Icon = ({ icon }) => {
  let iconToShow = (i) => {
    switch (i) {
      case "favorite":
        return <i className="fa-solid fa-heart"></i>;
      case "notFavorite":
        return <i className="fa-regular fa-heart"></i>;
      case "time":
        return <i className="fa-regular fa-clock"></i>;
      case "filledStar":
        return <i className="fa-solid fa-star"></i>;
      case "halfStar":
        return <i className="fa-solid fa-star-half-stroke"></i>;
      case "emptyStar":
        return <i className="fa-regular fa-star"></i>;
      default:
        return <i className="fa-regular fa-circle"></i>;
    }
  };
  return <>{iconToShow(icon)}</>;
};
