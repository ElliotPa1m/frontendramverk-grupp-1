import { Icon } from "./Icon";
import { useFavorites } from "../contexts/FavouritesContext";

export const FavoriteButton = ({ id, recipe }) => {
  const favContext = useFavorites();
  const isFav = favContext.isFavourite(id);

  return (
    <>
      <button
        className="hover:cursor-pointer rounded-full bg-white/80 h-[35px] w-[35px]"
        onClick={() =>
          isFav
            ? favContext.removeFavourite(id)
            : favContext.addFavourite(recipe)
        }
      >
        <Icon icon={isFav ? "favorite" : "notFavorite"} />
      </button>
    </>
  );
};
