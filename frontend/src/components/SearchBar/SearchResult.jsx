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
  const searchQuery = useLocation().search;
  if (searchQuery.includes("category")) {
    searchItem = searchQuery.slice(10);
  } else if (searchQuery.includes("name")) {
    searchItem = searchQuery.slice(6);
  }

  // console.log(useLocation().search);
  console.log(searchItem);
  let backendSearchItem = searchItem;
  let foodType = false;

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

  if (searchItem === "milk%20tea" || searchItem === "Milk%20Tea") {
    backendSearchItem = "Milk Tea";
    foodType = true;
  }

  const restaurants = useSelector(getRestaurants);

  useEffect(() => {
    if (categoryTerms.includes(searchItem.toLowerCase())) {
      dispatch(fetchRestaurantsWithQuery(`?category=${backendSearchItem}`));
    } else if (searchItem === "milk%20tea" || searchItem === "Milk%20Tea" ||
      searchItem === "Milk%20tea" || searchItem === "milk%20Tea") {
      dispatch(fetchRestaurantsWithQuery(`?category=Milk`));
    } else {
      dispatch(fetchRestaurantsWithQuery(`?name=${backendSearchItem}`));
    }
  }, [searchItem]);

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
              <h1 className="search-result-title">
                {foodType ? `${backendSearchItem[0].toUpperCase() + 
                backendSearchItem.slice(1)}` : 
                `${backendSearchItem[0].toUpperCase() + 
                backendSearchItem.slice(1)} Cuisine`}</h1>
              <div className="scrollable-result-container">
                {restaurants.map((restaurant) =>
                  <Restaurant key={restaurant.id} restaurant={restaurant} />)}
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