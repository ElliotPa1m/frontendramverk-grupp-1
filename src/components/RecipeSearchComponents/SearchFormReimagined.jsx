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

  return <div>SearchFormReimagined</div>;
};

export default SearchFormReimagined;
