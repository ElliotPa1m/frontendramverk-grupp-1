import apiClient from './axiosConfig';

/*----------------------------------------------/ 
/                                               /
/       API for GET recipes using Axios         /     
/                                               /
/----------------------------------------------*/

// NEW: In-memory cache container!
const recipeCache = {};

/**
 * Fetches recipes from the API with optional filtering. Full list of possible params here: https://recipeapi.io/docs/resources/recipes/
 * Suggested params below:
 *
 * @param {Object} [filters] - Optional filter parameters
 * @param {string} [filters.search] - Search query string
 * @param {string} [filters.cuisine] - Cuisine type (e.g. 'italian', 'japanese')
 * @param {string} [filters.dietary_tags] - Dietary tags (e.g. 'vegan', 'gluten_free') *Currently only accepts a single value
 * @param {string} [filters.meal_type] - Meal type (e.g. 'breakfast', 'main')
 * @param {number} [page=1] - Page number for pagination (Needed since our free-api-tier only allows 10 recipes per request)
 * @returns {Promise<Object>} Recipe list and metadata
 * @example
 * getAllRecipes({ cuisine: 'italian', meal_type: 'starter' }, 2);
 */
export const getAllRecipes = async (filters = {}, page = 1) => {
  try {
    const response = await apiClient.get('/recipes', {
      params: {
        lang: 'en',
        per_page: 10,
        page,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipes ' + error.message, {
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
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe ' + id + ': ' + error.message, {
      cause: error,
    });
  }
};

/**
 * NEW: Cached version of search fetcher!
 * Checks memory before calling the API.
 */
export const getCachedRecipe = async (query, page = 1) => {
  // Create a unique key combining query and page
  const cacheKey = `${query}-page-${page}`;

  // Do we already have this exact search and page in memory?
  if (recipeCache[cacheKey]) {
    console.log(`Serving "${query}" (page ${page}) from cache 🧑‍🍳`);
    return recipeCache[cacheKey];
  }

  // If not, fetch it from the API like we normally would
  const data = await getAllRecipes({ search: query }, page);

  // Now we save it to the cache object for next time!
  recipeCache[cacheKey] = data;
  return data;
}