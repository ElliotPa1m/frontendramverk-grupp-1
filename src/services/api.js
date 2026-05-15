import apiClient from './axiosConfig';

/**
 * Fetches recipes from the API with optional filtering.
 *
 * @param {Object} filters - Optional filter parameters
 * @param {string} [filters.search] - Search query string
 * @param {string} [filters.cuisine] - Cuisine type (e.g. 'italian', 'asian')
 * @param {string} [filters.dietary_tags] - Dietary tags (e.g. 'vegan', 'gluten-free')
 * @param {string} [filters.meal_type] - Meal type (e.g. 'breakfast', 'dinner')
 * @param {number} [filters.prep_time_max] - Maximum prep time in minutes
 */
export const getAllRecipes = async (filters = {}) => {
  try {
    const response = await apiClient.get('recipes', {
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
