import { useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurants";
import MapBuilder from "../../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import Restaurant from "../Restaurant";
import Filter from "./Filter";

const RatingFilteredResult = () => {
  let ratingOption = useLocation().search.slice(16);
  ratingOption = parseFloat(ratingOption);
  const restaurants = useSelector(getRestaurants);

  let ratingFilter = [];
  if (ratingOption === 1.0) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating > 0 && restaurant.averageRating < 1.25)
  } else if (ratingOption === 1.5) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 1.25 && restaurant.averageRating < 1.875)
  } else if (ratingOption === 2.0) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 1.875 && restaurant.averageRating < 2.25)
  } else if (ratingOption === 2.5) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 2.25 && restaurant.averageRating < 2.875)
  } else if (ratingOption === 3.0) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 2.875 && restaurant.averageRating < 3.25)
  } else if (ratingOption === 3.5) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 3.25 && restaurant.averageRating < 3.875)
  } else if (ratingOption === 4.0) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 3.875 && restaurant.averageRating < 4.25)
  } else if (ratingOption === 4.5) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 4.25 && restaurant.averageRating < 4.875) 
  } else if (ratingOption === 5.0) {
    ratingFilter = restaurants.filter(restaurant => 
      restaurant.averageRating >= 4.875)
  }

  return (
    <>
      <div className="bp-line-break"></div>
      <div className="business-page-container">

        <div className="left-side-bar">
          <Filter />
        </div>

        <div className="main-content">
          <div className="search-result-container">
            <h1 className="search-result-title">
              {ratingOption === 1.0 ? `${ratingOption} star` : 
                ratingOption > 1.0 ? `${ratingOption} stars` :
                "Restaurants"}
            </h1>

            <div className="scrollable-result-container">
              {ratingFilter.map((filteredRestaurant) =>
                  <Restaurant key={filteredRestaurant.id}
                    restaurant={filteredRestaurant} />)}

            </div>
            
          </div>
        </div>

        <div className="right-side-bar">
          <div className="google-map">
            <MapBuilder restaurants={ratingFilter} />
          </div>
        </div>

      </div>
    </>
  );
}

export default RatingFilteredResult;