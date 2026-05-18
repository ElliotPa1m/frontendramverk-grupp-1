import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/RecipeDetailsComponents/RecipeHeader";
import RecipeMeta from "../components/RecipeDetailsComponents/RecipeMeta";
import IngredientList from "../components/RecipeDetailsComponents/IngredientList";
import InstructionList from "../components/RecipeDetailsComponents/InstructionList";
import Image from "../components/Image";
import FavoriteButton from "../components/FavoriteButton";
import { getRecipeById } from "../services/api";

function RecipeDetailsPage() {
    const {id} = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                setLoading(true);
                setError(null);
                
                const data = await getRecipeById(id);
                setRecipe(data);
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

// this builds an array from TheMealDB's ingredient list that is listed separately
    const ingredients = Array.from({length: 20}, (_, i) => ({
        name: recipe[`strIngredient${i + 1}`],
        measure: recipe[`strMeasure${i + 1}`],
    })).filter((ing) => ing.name && ing.name.trim() !== "");

// this splits the instructions string into an array of steps by newline
    const instructions = recipe.strInstructions
        .split("\n")
        .filter((step) => step.trim() !== "");

    return(
        <div>
            <RecipeHeader
                name={recipe.strMeal}
                cuisine={recipe.strArea}
                category={recipe.strCategory}
            />
            <Image src={recipe.strMealThumb}/>
            <FavoriteButton recipeId={recipe.idMeal} />
            <RecipeMeta
                category={recipe.strCategory}
                area={recipe.strArea}
                tags={recipe.strTags}
            />
            <IngredientList ingredients={ingredients} />
            <InstructionList instructions={instructions} />
        </div>
    );
}

export default RecipeDetailsPage;