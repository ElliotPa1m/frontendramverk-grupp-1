export const Icon = ({ icon }) => {
  let iconToShow = (i) => {
    switch (i) {
      case "favorite":
        return <i className="fa-solid fa-heart text-button"></i>;
      case "notFavorite":
        return <i className="fa-regular fa-heart text-button"></i>;
      case "time":
        return <i className="fa-regular fa-clock"></i>;
      case "filledStar":
        return <i className="fa-solid fa-star"></i>;
      case "halfStar":
        return <i className="fa-solid fa-star-half-stroke"></i>;
      case "emptyStar":
        return <i className="fa-regular fa-star"></i>;
      case "arrowRight":
        return <i className="fa-solid fa-arrow-right"></i>;
      case "edit":
        return <i className="fa-solid fa-pen"></i>;
      default:
        return <i className="fa-regular fa-circle"></i>;
    }
  };
  return <>{iconToShow(icon)}</>;
};
