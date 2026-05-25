import { useState, useEffect, useRef } from 'react';
import SearchFormSingleInput from '../components/RecipeSearchComponents/SearchFormSingleInput';
import { getCachedRecipes, getRandomRecipes } from '../services/api';
import { RecipeCardList } from '../components/RecipeCardList';
import { RecipeCardSkeletonList } from '../components/RecipeCardSkeleton';
import ErrorParagraph from '../components/ErrorParagraph';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedRandomRecipes = useRef(false);

  // load 10 random recipes on mount
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        setError(null);
        const data = await getRandomRecipes(10);
        setRecipes(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (hasFetchedRandomRecipes.current === false) {
      hasFetchedRandomRecipes.current = true;
      loadInitialRecipes();
    }
  });

  // Called when SearchFilter submits
  const handleSearch = async ({ filter, value }) => {
    setIsLoading(true);
    try {
      const data = await getCachedRecipes({ filter, value });
      setRecipes(data);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    console.error(error); // Log the real error for developers
    return  <ErrorParagraph /> // The friendly default message is shown to the user
  } 

  // TODO Loading UI-message
  return (
    <div className="mt-4">
      <SearchFormSingleInput onSearch={handleSearch} />
      {isLoading ? (
        <RecipeCardSkeletonList count={12} />
      ) : (
        <RecipeCardList arr={recipes} />
      )}
    </div>
  );
};

export default SearchPage;
