import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/RecipeDetailsComponents/RecipeHeader";
import RecipeMeta from "../components/RecipeDetailsComponents/RecipeMeta";
import IngredientList from "../components/RecipeDetailsComponents/IngredientList";
import InstructionList from "../components/RecipeDetailsComponents/InstructionList";
import { Image } from "../components/General/Image";
import { FavoriteButton } from "../components/General/FavoriteButton";
import { getRecipeById } from "../services/api";
import { getUserRecipeById } from "../services/userRecipeService";
import ErrorParagraph from "../components/General/ErrorParagraph";
import { recipeReconstructor } from "../utils/recipeReconstructor";
import { sanitizeInstructions } from "../utils/sanitizeInstruction";

function RecipeDetailsPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError(null);

        const data =
          id.length === 5 ? await getRecipeById(id) : getUserRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error(error); // Log the real error for developers
    return <ErrorParagraph />; // The friendly default message is shown to the user
  }

  if (!recipe) return null;

  // Adapter for ingredients: Check if it's a custom recipe (already an array), otherwise run the already-in-place API mapping
  const ingredients = recipe.ingredients
    ? recipe.ingredients
    : // Here in the else clause, we run the previous code
      // this builds an array from TheMealDB's ingredient list that is listed separately
      Array.from({ length: 20 }, (_, i) => ({
        name: recipe[`strIngredient${i + 1}`],
        measure: recipe[`strMeasure${i + 1}`],
      })).filter((ing) => ing.name && ing.name.trim() !== "");

  // Adapter for instructions: Grab the custom string OR the API string, then split it exactly like before
  const instructionString = recipe.instructions || recipe.strInstructions || "";

  // No more code here trying to catch every single edge case that our stupid API might throw at us, run the ultimate sanitizer on the instructionString instead haha!
  const instructions = sanitizeInstructions(instructionString);

  const recipeToShow = recipeReconstructor(recipe);

  return (
    <div className="max-w-5xl ml-8 px-6 py-8">
      <RecipeHeader
        name={recipeToShow.strMeal}
        cuisine={recipeToShow.strArea}
        category={recipeToShow.strCategory}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - image, favorite, meta */}
        <div className="flex flex-col">
          <div className="w-full md:w-64 mt-4 mb-4">
            <Image
              imgUrl={recipeToShow.strMealThumb}
              recipeName={recipeToShow.strMeal}
            />
          </div>
          <div className="w-fit">
            <FavoriteButton recipe={recipe} />
          </div>
          <RecipeMeta
            category={recipeToShow.strCategory}
            area={recipeToShow.strArea}
            tags={recipeToShow.strTags}
          />
        </div>
        {/* Middle column - ingredients */}
        <div className="flex flex-col mt-4">
          <IngredientList ingredients={ingredients} />
        </div>
        {/* Right column - instructions */}
        <div className="flex flex-col flex-1 mt-4 min-w-0">
          <InstructionList instructions={instructions} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsPage;
