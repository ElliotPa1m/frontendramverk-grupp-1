import { Image } from "./Image";
import { IconButton } from "./IconButton";
import { IconWithInfo } from "./IconWithInfo";
import { RecipeCardInfoSection } from "./RecipeCardInfoSection";
import { useState } from "react";

export const RecipeCard = ({ recipe, rating }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="border border-2 border-stone-500 rounded-md overflow-hidden min-w-fit max-w-70 bg-amber-50">
      <div className="relative">
        <Image imgUrl={recipe.image} recipeName={recipe.name} />
        <div className="absolute top-2 right-3">
          <IconButton
            icon={saved ? "saved" : "toSave"}
            actionHandler={() => setSaved(!saved)}
          />
        </div>

        <div className="absolute bottom-2 left-3">
          <IconWithInfo icon={"time"} timeToCook={recipe.meta.total_time} />
        </div>
      </div>
      <RecipeCardInfoSection
        recipeName={recipe.name}
        dietary={recipe.dietary}
        rating={rating}
      />
    </div>
  );
};
