import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";
import { getUserRecipes } from "../services/userRecipeService";
import { mockRecipeArr } from "../utils/mockData";
import { LinkTextComp } from "../components/LinkTextComp";
import { SeeAllLinkComp } from "../components/SeeAllLinkComp";

export const CreatedFavoritePage = () => {
  const devEnv = import.meta.env.VITE_APP_ENV ?? "prod";

  console.log(mockRecipeArr);
  const favContext = useFavorites();
  const favArr = favContext.favourites;
  const userRecipes = getUserRecipes();
  const createdRecipes =
    devEnv === "dev"
      ? userRecipes.length !== 0
        ? userRecipes
        : mockRecipeArr
      : userRecipes;

  return (
    <div className="mx-4 my-4">
      <h2 className="barlow-condensed-regular text-2xl">Created recepies</h2>

      {createdRecipes.length !== 0 ? (
        <>
          <RecipeCardList
            arr={createdRecipes.slice(0, window.innerWidth < 768 ? 2 : 4)}
          />
          <SeeAllLinkComp route={"/created"} />
        </>
      ) : (
        <p className="barlow-condensed-light text-text">
          You have not created any recipes yet, create a recipe{" "}
          <LinkTextComp route={"/create"} actionText={"here"} />.
        </p>
      )}

      <hr className="my-4" />
      <h2 className="barlow-condensed-regular text-2xl">Favorites</h2>
      {favArr.length !== 0 ? (
        <>
          <RecipeCardList
            arr={favArr.slice(0, window.innerWidth < 768 ? 2 : 4)}
          />

          <SeeAllLinkComp route={"/favorites"} />
        </>
      ) : (
        <p className="barlow-condensed-light text-text">
          You dont have any favorites yet
        </p>
      )}
    </div>
  );
};
