import { useState, useEffect } from 'react';
import SearchFilter from '../components/RecipeSearchComponents/SearchForm';
import { getCachedRecipes, getRandomRecipes } from '../services/api';
import { RecipeCardList } from '../components/RecipeCardList';

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
    <div>
      <SearchFilter onSearch={handleSearch} />
      <RecipeCardList arr={recipes} />
    </div>
  );
};

export default SearchPage;
