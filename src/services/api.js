import apiClient from './axiosConfig';

/*----------------------------------------------/ 
/                                               /
/       API for GET recipes using Axios         /     
/                                               /
/----------------------------------------------*/

// In-memory cache container!
const recipeCache = {};

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
export const getAllRecipes = async ({ filter, value }) => {
  // filter decides endpoint and query param for getAllRecipes
  const endpoints = {
    name: 'search.php?s=',
    category: 'filter.php?c=',
    area: 'filter.php?a=',
    ingredient: 'filter.php?i=',
  };

  // set up the chosen filter type/endpoint.
  const activeFilter = endpoints[filter];
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
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe ' + id + ': ' + error.message, {
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

  if (recipeCache[cacheKey]) {
    console.log(`Serving "${value}" (${filter}) from cache 🧑‍🍳`);
    return recipeCache[cacheKey];
  }

  const data = await getAllRecipes({ filter, value });
  recipeCache[cacheKey] = data;
  return data;
};
