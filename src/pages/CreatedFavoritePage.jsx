import { RecipeCardList } from "../components/RecipeCardList";
import { useRecipes } from "../contexts/RecipesContext";
import { getUserRecipes } from "../services/userRecipeService";
import { LinkTextComp } from "../components/LinkTextComp";
import { SeeAllLinkComp } from "../components/SeeAllLinkComp";
import { ParagraphComp } from "../components/ParagraphComp";
import { HeadingComp } from "../components/HeadingComp";
import { createdMockRecipeArr } from "../data/mockData/createdRecipeMockData";

export const CreatedFavoritePage = () => {
  const devEnv = import.meta.env.VITE_APP_ENV ?? "prod";

  const recipeContext = useRecipes();
  const favArr = recipeContext.favourites;
  const userRecipes = getUserRecipes();
  const createdRecipes =
    devEnv === "dev"
      ? userRecipes.length !== 0
        ? userRecipes
        : createdMockRecipeArr
      : userRecipes;
  const amountOfCardsToShow = Math.floor(
    ((window.innerWidth > 1250 ? 1250 : window.innerWidth) - 15) / 275,
  );

  return (
    <div className="m-4 px-4 min-w-[90%] max-w-[1250px] mx-auto">
      <HeadingComp text={"Created recepies"} size={"h2"} />
      {createdRecipes.length !== 0 ? (
        <>
          <RecipeCardList arr={createdRecipes} />
          {createdRecipes.length > amountOfCardsToShow && (
            <SeeAllLinkComp route={"/created"} />
          )}
        </>
      ) : (
        <p className="barlow-condensed-light text-text">
          You have not created any recipes yet, create a recipe{" "}
          <LinkTextComp route={"/create"} actionText={"here"} />.
        </p>
      )}
      <hr className="my-4" />
      <HeadingComp text={"Favorites"} size={"h2"} />
      {favArr.length !== 0 ? (
        <>
          <RecipeCardList arr={favArr} />

          {favArr.length > amountOfCardsToShow && (
            <SeeAllLinkComp route={"/favorites"} />
          )}
        </>
      ) : (
        <ParagraphComp text={"You dont have any favorites yet"} />
      )}
    </div>
  );
};
