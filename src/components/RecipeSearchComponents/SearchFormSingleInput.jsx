/* Upon actually trying to use the searchForm i realized what a bad user experince the disable-toggle turned out to be - the layout of having several input fields but only being able to use one makes sense to highlight what we intended to do and what our api's limitations are.

In order to "make the best of what we have" i decided to retool it but I'll do so in a new component file instead of trying to refactor the working, albeit clunky SearchForm.

*/

import { useState, useEffect } from 'react';
import { getCachedList } from '../../services/api';
import mainIngredients from '../../data/mainIngredients.json';

const SearchFormSingleInput = ({ onSearch }) => {
  const [search, setSearch] = useState({ filter: 'name', value: '' });
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    area: [],
    ingredient: [],
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
          category: categories.map(c => c.strCategory),
          area: areas.map(a => a.strCountry),
          ingredient: mainIngredients, // loaded from mainIngredients.json
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
    <form
      onSubmit={handleSubmit}
      className="barlow-condensed-light
               flex flex-col sm:flex-row gap-3 items-stretch sm:items-center
               w-full max-w-[1250px] mx-auto mt-4"
    >
      {/* coupled filter + value — single bordered container */}
      <div
        className="flex flex-1 border border-pop/40 rounded-lg overflow-hidden bg-white
                shadow-sm focus-within:border-pop transition"
      >
        {/* filter type dropdown */}
        <div className="relative shrink-0">
          <select
            value={search.filter}
            onChange={e => handleFilterChange(e.target.value)}
            className="appearance-none h-full px-4 py-3 pr-9 text-base text-text bg-white
                     border-r border-pop/40 outline-none cursor-pointer"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="area">Country</option>
            <option value="ingredient">Main ingredient</option>
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 9-7 7-7-7"
            />
          </svg>
        </div>

        {/* value field — text input OR dropdown */}
        {search.filter === 'name' ? (
          <input
            type="text"
            placeholder="Search recipe by name"
            disabled={isLoading}
            value={search.value}
            onChange={e => handleValueChange(e.target.value)}
            className="flex-1 px-4 py-3 text-base text-text outline-none bg-white min-w-0
                     placeholder:text-text/40 disabled:opacity-50"
          />
        ) : (
          <div className="relative flex-1 min-w-0">
            <select
              value={search.value}
              disabled={isLoading}
              onChange={e => handleValueChange(e.target.value)}
              className="appearance-none w-full px-4 py-3 pr-9 text-base text-text bg-white
                       outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="">
                Select {search.filter === 'area' ? 'country' : search.filter}
              </option>
              {filterOptions[search.filter].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 9-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* submit button */}
      <button
        type="submit"
        disabled={!search.value}
        className="barlow-condensed-regular
                 w-full sm:w-auto sm:shrink-0
                 px-10 py-3 rounded-lg bg-button text-white text-lg tracking-wide uppercase
                 shadow-sm
                 hover:brightness-110 active:brightness-95
                 focus:outline-none 
                 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchFormSingleInput;
