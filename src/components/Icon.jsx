export const Icon = ({ icon }) => {
  let iconToShow = (i) => {
    switch (i) {
      case "favorite":
        return <i class="fa-solid fa-heart"></i>;
      case "notFavorite":
        return <i class="fa-regular fa-heart"></i>;
      case "time":
        return <i class="fa-regular fa-clock"></i>;
      default:
        return <i class="fa-regular fa-circle"></i>;
    }
  };
  return <>{iconToShow(icon)}</>;
};
