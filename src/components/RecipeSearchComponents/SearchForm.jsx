import { useState , useEffect} from 'react'
import { getCachedList } from '../../services/api'
import mainIngredients from '../../data/mainIngredients.json';




//TEMP COMMENT:  Filter bar with a name search input and three dropdown filters. since only one filter can be used/active at a time the others will get disabled automatically.

const SearchForm = () => {

    const [filters, setFilters] = useState({
        name: '',
        category: '',
        mainIngredient: ''
    }


// useEffect


//HandleSearch


    )







  return (
    <div>SearchForm</div>
  )
}

export default SearchForm