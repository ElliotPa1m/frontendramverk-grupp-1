import { Icon } from "./Icon";
import { useFavorites } from "../contexts/FavouritesContext";

export const FavoriteButton = ({ recipe }) => {
  const id = recipe.id;
  const favContext = useFavorites();
  const isFav = favContext.isFavourite(id);

  return (
    <>
      <button
        className="hover:cursor-pointer rounded-xl bg-white/80 px-2"
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
