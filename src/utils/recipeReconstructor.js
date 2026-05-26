export const recipeReconstructor = (recipe) => {
  const created = recipe.createdAt ? true : false;

  const recipeObj = {
    idMeal: created ? recipe.id : recipe.idMeal,
    strMeal: created ? recipe.title : recipe.strMeal,
    strMealThumb: created ? recipe.imageUrl : recipe.strMealThumb,
    strCountry: created ? recipe.area : recipe.strCountry,
    strTags: created
      ? recipe.tags?.length
        ? recipe.tags.toString()
        : ""
      : recipe.strTags,
    strCategory: created ? recipe.category : recipe.strCategory,
    rating: recipe.rating,
  };
  return recipeObj;
};
