import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";

export const CreatedFavoritePage = () => {
  const favContext = useFavorites();

  const mockRecipes = [
    {
      strMeal: "Arroz con gambas y calamar",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/jc6oub1763196663.jpg",
      idMeal: "53147",
      strArea: "Spanish",
      strCountry: "Spain",
    },
    {
      strMeal: "Baked salmon with fennel & tomatoes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      idMeal: "52959",
      strArea: "British",
      strCountry: "United Kingdom",
    },
  ];
  return (
    <div className="mx-4 mt-4">
      <h2 className="text-lg">Created recepies</h2>
      <RecipeCardList arr={mockRecipes} />
      <hr className="my-4" />
      <h2 className="text-lg">Favorites</h2>
      {favContext.favourites.length !== 0 ? (
        <RecipeCardList arr={favContext.favourites} />
      ) : (
        <p>You dont have any favorites yet</p>
      )}
    </div>
  );
};
