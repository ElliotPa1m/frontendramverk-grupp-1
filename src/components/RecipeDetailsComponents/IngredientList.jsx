import { useState } from "react";

// this displays ingredients with a servings multiplier to scale amounts per serving
function IngredientList({ingredients}) {
    const [multiplier, setMultiplier] = useState(1);

    function handleIncrease() {
        setMultiplier((prev) => prev + 1);
    }
    
    // this stops the multiplier from going below 0
    function handleDecrease() {
        setMultiplier((prev) => (prev > 1 ? prev - 1 : 1));
    }

    return (
        <div className="p-6">
            <h2 className="barlow-condensed-regular text-2xl text-text mb-4">
                Ingredients
            </h2>

            {/* this is the servings controls */}
            <div className="flex items-center gap-3 mb-4">
                <span className="barlow-condensed-light text-text">
                    Servings: x{multiplier}
                </span>
                <button
                    className="barlow-condensed-light bg-button text-white px-3 py-1 rounded-full"
                    onClick={handleDecrease}>
                -
                </button>
        
                <button
                    className="barlow-condensed-light bg-button text-white px-3 py-1 rounded-full"
                    onClick={handleIncrease}>
                +
                </button>
            </div>

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