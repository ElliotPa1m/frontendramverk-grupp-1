import { IconButton } from "./IconButton";
import { useFavorites } from "../contexts/FavouritesContext";

export const FavoriteButton = ({ id, recipe }) => {
  const favContext = useFavorites();
  const isFav = favContext.isFavourite(id);
  return (
    <>
      <IconButton
        icon={isFav ? "favorite" : "notFavorite"}
        actionHandler={() =>
          isFav
            ? favContext.removeFavourite(id)
            : favContext.addFavourite(recipe)
        }
      />
    </>
  );
};
