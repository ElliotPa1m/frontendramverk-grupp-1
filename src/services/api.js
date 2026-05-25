import apiClient from './axiosConfig';

/*----------------------------------------------/ 
/                                               /
/       API for GET recipes using Axios         /     
/                                               /
/----------------------------------------------*/

// In-memory cache container - Now extended to hold both recipe results and filter options.
const cache = {
  categories: null,
  areas: null,
  recipes: {},
};

//used for getAllRecipes()
const recipeEndpoints = {
  name: 'search.php?s=',
  category: 'filter.php?c=',
  area: 'filter.php?a=',
  ingredient: 'filter.php?i=',
};

//used for getList
const listEndpoints = {
  categories: 'list.php?c=list',
  areas: 'list.php?a=list',
};

/**
 * Fetches recipes from the API 'https://www.themealdb.com/api.php'.
 *  LIMITATION: Uses different enpoints for each filter so it can only use one filter at a time.
 *
 * @param {{ type: string, value: string }} filter
 * @param {'name'|'category'|'area'|'ingredient'} filter.type
 * @param {string} filter.value
 * @returns {Promise<Object[]>} Array of recipe objects (empty if no matches)
 *
 */
const getAllRecipes = async ({ filter, value }) => {
  // set up the chosen filter type/endpoint.
  const activeFilter = recipeEndpoints[filter];
  if (!activeFilter) {
    throw new Error(`Unknown filter type: ${filter}`);
  }

  try {
    const response = await apiClient.get(
      activeFilter + encodeURIComponent(value),
    );
    return response.data.meals || []; // Because API returns null instead of [] when no matches
  } catch (error) {
    throw new Error('Failed to fetch recipes: ' + error.message, {
      cause: error,
    });
  }
};

/**
 * Fetches recipe by id.
 *
 * @param {string} id*
 * @returns {Promise<Object>} Single recipe object
 */
export const getRecipeById = async id => {
  try {
    const response = await apiClient.get(`/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    throw new Error('Failed to fetch recipe ' + id + ': ' + error.message, {
      cause: error,
    });
  }
};

// Helper function that makes sure we get no recipe duplicates
const dedupeRecipes = async (recipes, fetcher ) => {
  const targetNumber = recipes.lengt;
  let uniqueRecipes = new Map(recipes.map(r => [r.idMeal, r]));

  while (targetNumber < uniqueRecipes.size) {
    console.log('deduping...')
    const neededRecipes = targetNumber - uniqueRecipes.size;
    const newRecipes = await fetcher(neededRecipes);
    newRecipes.forEach(r => uniqueRecipes.set(r.idMeal, r));
  }

  return[...uniqueRecipes.values()];

}


/**
 * Fetches a number of random recipes.
 * Each call to the random endpoint returns one recipe, so we fire _count_ requests in parallel.
 *
 * @param {number} [count=10] - How many random recipes to fetch, default 10
 * @returns {Promise<Object[]>} Array of recipe objects
 */
export const getRandomRecipes = async (count = 10) => {
  try {
    // from makes /gives our array _count_ number of indexes and for each index it requests a random recipe from the api.
    const requests = Array.from({ length: count }, () =>
      apiClient.get('random.php'),
    );

    // Promise all makes sure the requests are fired in paralell, meaning we can recieve 10 recipes almost as fast as 1.
    const responses = await Promise.all(requests);

    const recipes = responses.map(response => response.data.meals[0]);

    return dedupeRecipes(recipes, getRandomRecipes)
  } catch (error) {
    throw new Error('Failed to fetch random recipes: ' + error.message, {
      cause: error,
    });
  }
};

/**
 * Reworked cached version of search fetcher to accomodate the new API. Scrapped the pagination.
 * Checks memory before calling the API.
 */
export const getCachedRecipes = async ({ filter, value }) => {
  const cacheKey = `${filter}-${value}`;

  if (cache.recipes[cacheKey]) {
    console.log(`Serving "${value}" (${filter}) from cache 🧑‍🍳`);
    return cache.recipes[cacheKey];
  }

  const data = await getAllRecipes({ filter, value });
  cache.recipes[cacheKey] = data;
  return data;
};

/**
 * Fetches list from the API 'https://www.themealdb.com/api.php' to populate the filter options with. Gets called by getCachedList  - only fires off once per list/page refresh
 *
 * @param {'categories'|'areas'} listType
 * @returns {Promise<Object[]>} Array of recipe objects (empty if no matches)
 *
 */
const getList = async listType => {
  const endpoint = listEndpoints[listType];
  if (!endpoint) throw new Error(`Unknown list type: ${listType}`);

  try {
    const response = await apiClient.get(endpoint);
    return response.data.meals || [];
  } catch (error) {
    throw new Error(`Failed to fetch ${listType}: ` + error.message, {
      cause: error,
    });
  }
};

// same logic as the getCachedRecipe function
export const getCachedList = listType => {
  if (!cache[listType]) {
    cache[listType] = getList(listType); // store the Promise immediately
  }
  return cache[listType]; // all callers await the same promise
};
