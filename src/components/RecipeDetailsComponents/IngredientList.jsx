// this displays ingredients from the recipe
function IngredientList({ ingredients }) {
    return (
        <div className="p-6">
            <h2 className="barlow-condensed-regular text-2xl text-text mb-4">
                Ingredients
            </h2>

            <ul className="flex flex-col gap-2">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex gap-2 barlow-condensed-light text-text">
                        <span>{ingredient.measure}</span>
                        <span>{ingredient.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;