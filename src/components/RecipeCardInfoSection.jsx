import { Rating } from "./Rating";

export const RecipeCardInfoSection = () => {
  return (
    <div>
      <h3>meal info</h3>
      <h2>Recipe name</h2>
      <div>
        <Rating />
        <span>readmore</span>
      </div>
    </div>
  );
};
