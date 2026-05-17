import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeDetailsPage from './pages/RecipeDetailsPage';

function App() {
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteRecipes, favoriteRecipes] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={} />
          <Route path='search' element={} />
          <Route path='saved' element={} />
          <Route path='create' element={} />
          <Route path='recipe/:id' element={<RecipeDetailsPage collection={userCollection} onAdd={addToCollection} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
