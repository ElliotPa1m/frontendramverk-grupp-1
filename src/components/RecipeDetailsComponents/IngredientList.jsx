import { HeadingComp } from "../General/HeadingComp";

// this displays ingredients from the recipe
function IngredientList({ ingredients }) {
  return (
    <div className="p-6">
      <HeadingComp text={"Ingredients"} size={"h2"} />

      <ul className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex gap-2 barlow-condensed-light text-text"
          >
            <span>{ingredient.measure}</span>
            <span>{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientList;
