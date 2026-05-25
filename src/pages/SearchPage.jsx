import { useState, useEffect, useRef } from 'react';
import SearchFormSingleInput from '../components/RecipeSearchComponents/SearchFormSingleInput';
import { getCachedRecipes, getRandomRecipes } from '../services/api';
import { RecipeCardList } from '../components/RecipeCardList';
import { RecipeCardSkeletonList } from '../components/RecipeCardSkeleton';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRandomRecipes = useRef(false);

  // load 10 random recipes on mount
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        const data = await getRandomRecipes(10);
        setRecipes(data);
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

  // TODO Error and loading UI-message
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
