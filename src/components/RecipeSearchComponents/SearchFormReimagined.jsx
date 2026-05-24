/* Upon actually trying to use the searchForm i realized what a bad user experince the disable-toggle turned out to be - the layout of having several input fields but only being able to use one makes sense to highlight what we intended to do and what our api's limitations are.

In order to "make the best of what we have" i decided to retool it but I'll do so in a new component file instead of trying to refactor the working, albeit clunky SearchForm.

*/

import { useState, useEffect } from 'react';
import { getCachedList } from '../../services/api';
import mainIngredients from '../../data/mainIngredients.json';

const SearchFormReimagined = () => {
  const [search, setSearch] = useState({ filter: null, value: '' });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    areas: [],
    ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // fetches both lists with promise.all into an array, uses array destructuring to "extract" both array indexes into their own variables - categories and areas.
        const [categories, areas] = await Promise.all([
          getCachedList('categories'),
          getCachedList('areas'),
        ]);

        setFilterOptions({
          categories: [
            ...new Map(categories.map(c => [c.strCategory, c])).values(),
          ],
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

  //HandleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    if (!search.value) return;
    onSearch(search);
  };

  // instead of having a filter input for every filter type (like a normal page where you can multiselect filters would) We'll only have one dropdown for setting filter type and one input field for typing/selecting the search term/value. so instead of handling form disabling and what not we'll only handle filter and value change:

  const handleFilterChange = filter => setSearch({ filter, value: '' });
  const handleValueChange = value => setSearch(prev => ({ ...prev, value }));

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={search.filter}
        onChange={e => handleFilterChange(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="area">Area</option>
        <option value="ingredient">Main ingredient</option>
      </select>

      {/* more conditional rendering! */}
      {search.filter === 'name' ? (
        <input
          type="text"
          placeholder="Search recipe by name..."
          value={search.value}
          onChange={e => handleValueChange(e.target.value)}
        />
      ) : (
        <select
          value={search.value}
          onChange={e => handleValueChange(e.target.value)}
        >
          <option value="">Select {search.filter}</option>
          {filterOptions[search.filter].map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </form>
  );
};

export default SearchFormReimagined;
