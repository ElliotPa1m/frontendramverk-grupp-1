import { useState, useEffect } from 'react';
import SearchFilter from '../components/RecipeSearchComponents/SearchForm';
import { getCachedRecipes, getRandomRecipes } from '../services/recipeService';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    loadInitialRecipes();
  }, []);

  
  const handleSearch = () => {
    console.log('testing');
  };

  return (
    <div>
      <SearchFilter onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;
