import { useState, useEffect } from 'react';
import { getCachedList } from '../../services/api';
import mainIngredients from '../../data/mainIngredients.json';

//TEMP COMMENT:  Filter bar with a name search input and three dropdown filters. since only one filter can be used/active at a time the others will get disabled automatically.

const SearchForm = ({ onSearch }) => {
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

        // Not sure why but MealDB returns duplicates of the filter options causing key collisions. as a temp (or permanent?) fix I added mapping in our initial setter function so we write over the first array instead of duplicating each entry. 
        setFilterOptions({
          categories: [...new Map(categories.map(c => [c.strCategory, c])).values()],
          areas: [...new Map(areas.map(a => [a.strArea, a])).values()],
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

  //HandleSubmit - meant for submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.filter) return;
    onSearch(search);
  };

  // Because the mealDB API only allows use of one filter a search this function will make sure that upon use of a filter input the other inputs gets disabled. This was the most 'elegant' solution I could come up with to suit or new (annoying) api.
  const isDisabled = (filterType) =>
    isLoading || search.filter !== null && search.filter !== filterType;

  // for updating the search state (which are the params for getAllRecipes). Runs every time user types in the search field(name) or picks something from a filter dropdown. If a user deletes their search term/filter option, the filter in search-useState becomes null, which enables all the filter form options again.

  const handleChange = (filterType, newValue) => {
    setSearch({
      filter: newValue ? filterType : null,
      value: newValue,
    });
  };

//TODO Error and loading UI-message

  return ( <form action={handleSubmit}>
   <input
        type="text"
        placeholder="Search by name..."
        value={search.filter === 'name' ? search.value : ''}
        disabled={isDisabled('name')}
        onChange={e => handleChange('name', e.target.value)}
      />

      <select
        value={search.filter === 'category' ? search.value : ''}
        disabled={isDisabled('category')}
        onChange={e => handleChange('category', e.target.value)}
      >
        <option value="">Category...</option>
        {filterOptions.categories.map(c => (
          <option key={c.strCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>

      <select
        value={search.filter === 'area' ? search.value : ''}
        disabled={isDisabled('area')}
        onChange={e => handleChange('area', e.target.value)}
      >
        <option value="">Area...</option>
        {filterOptions.areas.map(a => (
          <option key={a.strArea} value={a.strArea}>
            {a.strArea}
          </option>
        ))}
      </select>

      <select
        value={search.filter === 'ingredient' ? search.value : ''}
        disabled={isDisabled('ingredient')}
        onChange={e => handleChange('ingredient', e.target.value)}
      >
        <option value="">Main ingredient...</option>
        {filterOptions.ingredients.map(ingredient => (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>

      <button type="submit" disabled={!search.filter}>
        Search
      </button>
      </form>

  );
};

export default SearchForm;
