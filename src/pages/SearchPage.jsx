import { useState, useEffect } from 'react';
import SearchFilter from '../components/RecipeSearchComponents/SearchForm';

const SearchPage = () => {



    const handleSearch = () => {
        console.log('testing')
    }



  return (
    <div>
      <SearchFilter onSearch={handleSearch} />
    </div>
  )
}

export default SearchPage