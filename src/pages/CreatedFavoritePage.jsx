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
  const amountOfCardsToShow =
    window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;

  return (
    <div className="mx-4 my-4 min-w-[90vw] max-w-[1250px]">
      <HeadingComp text={"Created recepies"} size={"h2"} />
      {createdRecipes.length !== 0 ? (
        <>
          <RecipeCardList arr={createdRecipes.slice(0, amountOfCardsToShow)} />
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
          <RecipeCardList arr={favArr.slice(0, amountOfCardsToShow)} />

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
