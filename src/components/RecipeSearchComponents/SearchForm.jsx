import { useState, useEffect } from 'react';
import { getCachedList } from '../../services/api';
import mainIngredients from '../../data/mainIngredients.json';

//TEMP COMMENT:  Filter bar with a name search input and three dropdown filters. since only one filter can be used/active at a time the others will get disabled automatically.

const SearchForm = () => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    area: '',
    mainIngredient: '',
  });

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    areas: [],
    ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetches and loads filter options on mount.
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // fetches both lists with promise.all into an array, uses array destructuring to "extract" both array indexes into their own variables - categories and areas.
        const [categories, areas] = await Promise.all([
          getCachedList('categories'),
          getCachedList('areas'),
        ]);

        setFilterOptions({
          categories: categories,
          areas: areas,
          ingredients: mainIngredients, // loaded from mainIngredients.json
        });
      } catch (error) {
        console.error('Failed to load filter options:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  //HandleSearch

  return <div>SearchForm</div>;
};

export default SearchForm;
