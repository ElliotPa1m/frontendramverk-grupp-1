import { useState, useEffect, useRef } from 'react';
import SearchFormSingleInput from '../components/RecipeSearchComponents/SearchFormSingleInput';
import { getCachedRecipes, getRandomRecipes } from '../services/api';
import { RecipeCardList } from '../components/RecipeCardList';
import { RecipeCardSkeletonList } from '../components/RecipeCardSkeleton';
import ErrorParagraph from '../components/ErrorParagraph';
import { ParagraphComp } from '../components/ParagraphComp';
import { HeadingComp } from '../components/HeadingComp';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedRandomRecipes = useRef(false);

  // load 10 random recipes on mount
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        const data = await getRandomRecipes(10);
        setRecipes(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (hasFetchedRandomRecipes.current === false) {
      hasFetchedRandomRecipes.current = true;
      loadInitialRecipes();
    }
  });

  // Called when SearchFilter submits
  const handleSearch = async ({ filter, value }) => {
    setIsLoading(true);
    try {
      const data = await getCachedRecipes({ filter, value });
      setRecipes(data);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    console.error(error); // Log the real error for developers
    return  <ErrorParagraph /> // The friendly default message is shown to the user
  } 

  // TODO Loading UI-message
  return (
    <div className="mt-4">
      <SearchFormSingleInput onSearch={handleSearch} />

      {/* The new three-way conditional rendering: If loading, show skeleton, if there are results show them, else show the "empty search results" message */}
      {isLoading ? (
        <RecipeCardSkeletonList count={10} />
      ) : recipes.length > 0 ? (
        <RecipeCardList arr={recipes} />
      ) : (
        <div className="text-center mt-16 px-4">
          <HeadingComp text="No recipes found" size="h2" />
          <ParagraphComp text="We couldn't find any recipes matching your search. Try adjusting your filter or searching for a different ingredient!" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
