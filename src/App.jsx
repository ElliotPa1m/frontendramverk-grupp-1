// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { CreatedFavoritePage } from "./pages/CreatedFavoritePage";
import { AllCreatedRecipePage } from "./pages/AllCreatedRecipePage";
import { AllFavoriteRecipePage } from "./pages/AllFavoriteRecipePage";
import SearchPage from "./pages/SearchPage";
// import RecipeDetailsPage from './pages/RecipeDetailsPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import CreateRecipePage from "./pages/CreateRecipePage";
import HomePage from "./pages/HomePage";

function App() {
  // const [userRecipes, setUserRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes */}
        <Route path="/" element={<Layout />}>
          {/* All of these are commented out until the pages are created and ready to be inserted as the element */}
          {/* <Route index element={} /> */}
          <Route path='search' element={<SearchPage />} />
          <Route index element={<HomePage />} />
          {/* <Route path='search' element={} /> */}
          <Route path="my-recipes" element={<CreatedFavoritePage />} />
          <Route path="created" element={<AllCreatedRecipePage />} />
          <Route path="favorites" element={<AllFavoriteRecipePage />} />
          <Route path='create' element={<CreateRecipePage />} />
          <Route path='recipe/:id' element={<RecipeDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
