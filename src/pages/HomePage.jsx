import { useState, useEffect, useRef } from "react";
import FeatureCard from "../components/FeatureCard";
import { getRandomRecipes } from "../services/api";
import { RecipeCardList } from "../components/RecipeCardList";
import ErrorParagraph from "../components/ErrorParagraph";

const HomePage = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasFetchedRandomRecipes = useRef(false);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRandomRecipes(3);
        setRandomRecipes(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    // keeps recipes from rendering twice on load
    if (hasFetchedRandomRecipes.current === false) {
      hasFetchedRandomRecipes.current = true;
      fetchRandomRecipes();
    }
  });

  if (loading) {
    return <div className="loading-recipe">Loading recipes...</div>;
  }

  if (error) {
    console.error(error); // Log the real error for developers
    return  <ErrorParagraph /> // The friendly default message is shown to the user
  } 

  return (
    <div className="mx-2">
      <RecipeCardList arr={randomRecipes} />

      <div
        className="features 
      flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3
      h-full 
      py-4 px-2 lg:p-8"
      >
        <FeatureCard
          title="Search for a recipe"
          description="Searching for a recipe from TheMealDB database"
          to="/search"
          linkText="Search here"
        />
        <FeatureCard
          title="Favorite recipes"
          description="See your favorite recipes"
          to="/my-recipes"
          linkText="Favorite recipes"
        />
        <FeatureCard
          title="Upload your own recipe"
          description="Upload your own recipes here"
          to="/create"
          linkText="Upload recipes"
        />
      </div>
    </div>
  );
};

export default HomePage;
