import { useLocation } from "react-router-dom";
import { fetchRestaurantsWithQuery, getRestaurants } from "../../store/restaurants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapBuilder from "../MapBuilder/MapBuilder";
import Filter from "../BusinessesPage/Filter/Filter";
import Restaurant from "../BusinessesPage/Restaurant";

const SearchResult = () => {
  const dispatch = useDispatch();

  // check search item in the front end before sending it to the backend for
  // filteration
  const categoryTerms = [
    'japanese', 'chinese', 'thai', 'french', 'italian', 'mexican',
    'milk tea', 'pizza', 'ramen', 'sushi', 'tea', 'spagetti'
  ];

  let searchItem = "";
  
  let foodType = false;
  let nameParams = false;

  const searchQuery = useLocation().search;

  if (searchQuery.includes("category")) {
    searchItem = searchQuery.slice(10);
  } else if (searchQuery.includes("name")) {
    searchItem = searchQuery.slice(6);
    nameParams = true;
  }

  let backendSearchItem = searchItem;

  if (searchItem === "pizza" || searchItem === "Pizza") {
    foodType = true;
  } 
  
  if (searchItem === "spagetti" || searchItem === "Spagetti") {
    backendSearchItem = "Italian";
    foodType = true;
  }
  
  if (searchItem === "ramen" || searchItem === "Ramen") {
    foodType = true;
  }
  
  if (searchItem === "sushi" || searchItem === "Sushi") {
    foodType = true;
  }
  
  if (searchItem === "tea" || searchItem === "Tea") {
    foodType = true;
  }

  if (searchItem.toLowerCase() === "milk%20tea") {
    backendSearchItem = "Milk Tea";
    foodType = true;
  }

  if (searchItem.toLowerCase() === "joe%27s%20pizza") {
    backendSearchItem = "Joe's Pizza";
  }

  const restaurants = useSelector(getRestaurants);

  useEffect(() => {
    if (categoryTerms.includes(searchItem.toLowerCase())) {
      dispatch(fetchRestaurantsWithQuery(`?category=${backendSearchItem}`));
    } else if (searchItem.toLowerCase() === "milk%20tea") {
      dispatch(fetchRestaurantsWithQuery(`?category=Milk`));
    } else {
      dispatch(fetchRestaurantsWithQuery(`?name=${backendSearchItem}`));
    }
  }, [searchItem]);

  backendSearchItem = backendSearchItem.replaceAll("%27", "'");

  return (
    <>
      <div className="bp-line-break"></div>
      { searchItem ? 
        <div className="business-page-container">

          <div className="left-side-bar">
            <Filter />
          </div>

          <div className="main-content">
            <div className="search-result-container">

              {foodType && !nameParams ? 
                <h1 className="search-result-title">
                  {`${backendSearchItem[0].toUpperCase() +
                    backendSearchItem.slice(1)}`}</h1> :
                    !foodType && !nameParams ? 
                    <h1 className="search-result-title">
                    {`${backendSearchItem[0].toUpperCase() +
                    backendSearchItem.slice(1).toLowerCase()} Cuisine`}
                    </h1> :
                    <h1 className="search-result-title">
                      {`${backendSearchItem[0].toUpperCase()}` + backendSearchItem.slice(1).replaceAll("%20", " ")}
                    </h1>}

              <div className="scrollable-result-container">
                {restaurants && restaurants.map((restaurant, idx) =>
                  <Restaurant key={restaurant.id} restaurant={restaurant} 
                  index={idx}/>)}
              </div>
            </div>
          </div>

          <div className="right-side-bar">
            <div className="google-map">
              <MapBuilder restaurants={restaurants} />
            </div>
          </div>

        </div> : <div></div>
      }
    </>
  );
}

export default SearchResult;