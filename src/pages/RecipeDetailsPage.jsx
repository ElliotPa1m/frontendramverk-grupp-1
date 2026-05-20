import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/RecipeDetailsComponents/RecipeHeader";
import RecipeMeta from "../components/RecipeDetailsComponents/RecipeMeta";
import IngredientList from "../components/RecipeDetailsComponents/IngredientList";
import InstructionList from "../components/RecipeDetailsComponents/InstructionList";
import { Image } from "../components/Image";
import { FavoriteButton } from "../components/FavoriteButton";
import { getRecipeById } from "../services/api";

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

                const data = await getRecipeById(id);
                setRecipe(data.meals[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();

    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
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
    // this splits the instructions string into an array of steps by newline
    const instructions = instructionString
        .split("\n")
        .filter((step) => step.trim() !== "");

    return (
        <div className="max-w-5xl ml-8 px-6 py-8">
            <RecipeHeader
                name={recipe.strMeal}
                cuisine={recipe.strArea}
                category={recipe.strCategory}
            />
            <div className="flex gap-8">
                {/* Left column - image, favorite, meta */}
                <div className="flex flex-col">
                    <div style={{ width: "256px" }} className="mt-4 mb-4">
                        <Image imgUrl={recipe.strMealThumb} recipeName={recipe.strMeal} />
                    </div>
                    <div className="w-fit">
                        <FavoriteButton recipeId={recipe.idMeal} />
                    </div>
                    <RecipeMeta
                        category={recipe.strCategory}
                        area={recipe.strArea}
                        tags={recipe.strTags}
                    />
                </div>
                {/* Middle column - ingredients */}
                <div className="flex flex-col mt-4">
                    <IngredientList ingredients={ingredients} />
                </div>
                {/* Right column - instructions */}
                <div className="flex flex-col flex-1 mt-4">
                    <InstructionList instructions={instructions} />
                </div>
            </div>
        </div>
    );
}

export default RecipeDetailsPage;