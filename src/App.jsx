// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { CreatedFavoritePage } from "./pages/CreatedFavoritePage";
import RecipeDetailsPage from './pages/RecipeDetailsPage';

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
          {/* <Route path='search' element={} /> */}
          <Route path="saved" element={<CreatedFavoritePage />} />
          {/* <Route path='create' element={} /> */}
          <Route path='recipe/:id' element={<RecipeDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
