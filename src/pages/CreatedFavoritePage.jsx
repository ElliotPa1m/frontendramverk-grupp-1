import { Link } from "react-router-dom";
import { RecipeCardList } from "../components/RecipeCardList";
import { useFavorites } from "../contexts/FavouritesContext";

export const CreatedFavoritePage = () => {
  const favContext = useFavorites();

  const mockRecipes = [
    {
      idMeal: "53147",
      strMeal: "Arroz con gambas y calamar",
      strMealAlternate: null,
      strCategory: "Seafood",
      strArea: "Spanish",
      strCountry: "Spain",
      strInstructions:
        "step 1\r\nPeel and devein most of the prawns (a fishmonger should be able to do this for you), keeping a few whole for decoration, if you like. Heat the olive oil in a large frying pan or shallow flameproof casserole over a medium-low heat and fry the onion for 5 mins until softened. Add the bay leaf, saffron, rice and tomato purée, and cook for 1-2 mins more, stirring.\r\n\r\nstep 2\r\nPour in the wine and bubble for 1-2 mins, then pour in the seafood stock and 150ml water. Cook for 5 mins, then add the squid, season well and stir to combine. Bring to the boil, then cover and reduce the heat to a gentle simmer. Cook for 12 mins more, adding a little more water if the mixture starts to look dry.\r\n\r\nstep 3\r\nUncover the pan and stir through the peeled prawns, then arrange any whole prawns on top of the rice mixture. Cover again and simmer for a further 5-6 mins until the prawns are pink and cooked through. Leave to stand for a couple of minutes before serving from the pan.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/jc6oub1763196663.jpg",
      strTags: null,
    },
    {
      idMeal: "52959",
      strMeal: "Baked salmon with fennel & tomatoes",
      strMealAlternate: null,
      strCategory: "Seafood",
      strArea: "British",
      strCountry: "United Kingdom",
      strInstructions:
        "Heat oven to 180C/fan 160C/gas 4. Trim the fronds from the fennel and set aside. Cut the fennel bulbs in half, then cut each half into 3 wedges. Cook in boiling salted water for 10 mins, then drain well. Chop the fennel fronds roughly, then mix with the parsley and lemon zest.\r\n\r\nSpread the drained fennel over a shallow ovenproof dish, then add the tomatoes. Drizzle with olive oil, then bake for 10 mins. Nestle the salmon among the veg, sprinkle with lemon juice, then bake 15 mins more until the fish is just cooked. Scatter over the parsley and serve.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      strTags: "Paleo,Keto,HighFat,Baking,LowCarbs",
    },
    {
      idMeal: "52771",
      strMeal: "Spicy Arrabiata Penne",
      strMealAlternate: null,
      strCategory: "Vegetarian",
      strArea: "Italian",
      strCountry: "Italy",
      strInstructions:
        "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      strTags: "Pasta,Curry",
    },
  ];
  return (
    <div className="mx-4 my-4">
      <h2 className="barlow-condensed-regular text-2xl">Created recepies</h2>
      {mockRecipes.length !== 0 ? (
        <>
          <RecipeCardList arr={mockRecipes} />
          <Link
            to="/created"
            className="barlow-condenced-light text-sm text-end block my-2"
          >
            See all
          </Link>
        </>
      ) : (
        <p>You have not created any recipes yet</p>
      )}
      <hr className="my-4" />
      <h2 className="barlow-condensed-regular text-2xl">Favorites</h2>
      {favContext.favourites.length !== 0 ? (
        <>
          <RecipeCardList
            arr={favContext.favourites.slice(
              0,
              window.innerWidth < 768 ? 2 : 4,
            )}
          />
          <Link
            to="/favorites"
            className="barlow-condenced-light text-sm text-end block my-2"
          >
            See all
          </Link>
        </>
      ) : (
        <p>You dont have any favorites yet</p>
      )}
    </div>
  );
};
