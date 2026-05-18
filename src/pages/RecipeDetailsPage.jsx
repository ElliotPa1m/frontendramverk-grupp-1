import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/RecipeDetailsComponents/RecipeHeader";
import RecipeMeta from "../components/RecipeDetailsComponents/RecipeMeta";
import NutritionInfo from "../components/RecipeDetailsComponents/NutritionInfo";
import IngredientList from "../components/RecipeDetailsComponents/IngredientList";
import InstructionList from "../components/RecipeDetailsComponents/InstructionList";
import Image from "../components/Image"
import FavoriteButton from "../components/FavoriteButton"

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://recipeapi.io/api/v1/recipes"

function RecipeDetailsPage() {
    const {id} = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecipe() {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${API_URL}/${id}`, {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Recipe not found");
                }

                const json = await response.json();
                setRecipe(json.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();

        return () => controller.abort();
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!recipe) return null;

    return(
        <div>
            <RecipeHeader
                name={recipe.name}
                description={recipe.description}
                cuisine={recipe.cuisine}
                mealType={recipe.meal_type}
                dietaryTags={recipe.dietary_tags}
            />
            <Image/>
            <FavoriteButton/>
            <RecipeMeta
                prepTime={recipe.prep_time}
                cookTime={recipe.cook_time}
                servings={recipe.servings}
                difficulty={recipe.difficulty}
            />
            <NutritionInfo
                calories={recipe.calories_per_serving}
                protein={recipe.protein}
            />
            <IngredientList ingredients={recipe.ingredients} />
            <InstructionList instructions={recipe.instructions} />
        </div>
    );
}

export default RecipeDetailsPage;