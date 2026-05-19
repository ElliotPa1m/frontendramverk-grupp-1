import { RecipeCardList } from "../components/RecipeCardList";

export const AllCreatedRecipePage = () => {
  const recipeArr = [];

  return (
    <div className="mx-4 my-4">
      <h2 className="barlow-condensed-regular text-2xl text-text">
        My Created Recipes
      </h2>
      {recipeArr.length !== 0 ? (
        <RecipeCardList arr={recipeArr} />
      ) : (
        <p>You have not created any recipes yet</p>
      )}
    </div>
  );
};
