export const Icon = ({ icon }) => {
  let iconToShow = (i) => {
    switch (i) {
      case "favorite":
        return <i className="fa-solid fa-heart"></i>;
      case "notFavorite":
        return <i className="fa-regular fa-heart"></i>;
      case "time":
        return <i className="fa-regular fa-clock"></i>;
      default:
        return <i className="fa-regular fa-circle"></i>;
    }
  };
  return <>{iconToShow(icon)}</>;
};
