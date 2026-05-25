import { useState, useEffect } from 'react';

export const useFetch = (fetchFunction) => {
  const [recipeData, setRecipeData] = useState(null); // Could use `data` here to make it more reusable and then alias the `data` variable like `data: recipes` or `data: categories` on the page that uses the hook, but we'll keep it simple and just use recipeData for this school group project since all of our api fetch functions also focus around recipe data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFunction();
        setRecipeData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { recipeData, isLoading, error };
};