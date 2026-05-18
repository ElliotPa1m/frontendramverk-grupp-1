import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/RecipeDetailsComponents/RecipeHeader";
import RecipeMeta from "../components/RecipeDetailsComponents/RecipeMeta";
import NutritionInfo from "../components/RecipeDetailsComponents/NutritionInfo";
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

    return(
        <div>
            <RecipeHeader
                name={recipe.name}
                description={recipe.description}
                cuisine={recipe.cuisine}
                mealType={recipe.meal_type}
                dietaryTags={recipe.dietary_tags}
            />
            <Image />
            <FavoriteButton recipeId={recipe.id} />
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