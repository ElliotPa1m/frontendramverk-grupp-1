import { useState } from "react";
import { Icon } from "./Icon";

export const FavoriteButton = () => {
  const [favorite, setFavorite] = useState(false);
  return (
    <>
      <button
        className="hover:cursor-pointer rounded-xl bg-white/80 px-2"
        onClick={() => setFavorite(!favorite)}
      >
        <Icon icon={favorite ? "favorite" : "notFavorite"} />
      </button>
    </>
  );
};
