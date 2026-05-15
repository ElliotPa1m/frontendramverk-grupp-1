import apiClient from './axiosConfig';


/*----------------------------------------------/ 
/                                               /
/       API for GET recipes using Axios         /     
/                                               /
/----------------------------------------------*/


/**
 * Fetches recipes from the API with optional filtering. Full list of possible params here: https://recipeapi.io/docs/resources/recipes/
 * Suggested params below:
 *
 * @param {Object} [filters] - Optional filter parameters
 * @param {string} [filters.search] - Search query string
 * @param {string} [filters.cuisine] - Cuisine type (e.g. 'italian', 'asian')
 * @param {string} [filters.dietary_tags] - Dietary tags (e.g. 'vegan', 'gluten-free') Currently only accepts a single value
 * @param {string} [filters.meal_type] - Meal type (e.g. 'breakfast', 'dinner')
 * @returns {Promise<Object>} Recipe list and metadata
 * @example
 * getAllRecipes({ cuisine: 'italian', meal_type: 'starter' });
 */
export const getAllRecipes = async (filters = {}) => {
  try {
    const response = await apiClient.get('/recipes', {
      params: {
        lang: 'en',
        per_page: 10,
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
