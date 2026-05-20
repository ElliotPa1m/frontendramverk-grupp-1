import { useState, useEffect } from 'react';
import { getCachedList } from '../../services/api';
import mainIngredients from '../../data/mainIngredients.json';

//TEMP COMMENT:  Filter bar with a name search input and three dropdown filters. since only one filter can be used/active at a time the others will get disabled automatically.

const SearchForm = ({ onSearch} ) => {
  const [search, setSearch] = useState({ filter: null, value: '' });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    areas: [],
    ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetches and loads filter  drop-down options on mount.
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

  //HandleSearch - meant for submit button

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.filter) return;
    onSearch(search);
  };

  return <div>SearchForm</div>;
};

export default SearchForm;
