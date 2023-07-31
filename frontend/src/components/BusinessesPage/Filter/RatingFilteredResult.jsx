import { useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurants";
import MapBuilder from "../../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import Restaurant from "../Restaurant";
import Filter from "./Filter";

const RatingFilteredResult = () => {
  let ratingOption = useLocation().pathname.slice(28);
  ratingOption = parseFloat(ratingOption);
  const restaurants = useSelector(getRestaurants);

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
              {ratingOption === 1 ?               
              restaurants.filter((restaurant) =>
                (restaurant.averageRating > 0 &&
                  restaurant.averageRating < 1.25))
                  .map((filteredRestaurant) =>
                  <Restaurant key={filteredRestaurant.id} restaurant=
                    {filteredRestaurant}/>) : 

                ratingOption === 1.5 ? restaurants.filter((restaurant) => 
                  (restaurant.averageRating >= 1.25 && 
                    restaurant.averageRating < 1.875))
                      .map((filteredRestaurant) => 
                      <Restaurant key={filteredRestaurant.id} restaurant=
                        {filteredRestaurant}/>) : 

                ratingOption === 2.0 ? restaurants.filter((restaurant) =>
                  (restaurant.averageRating >= 1.875 && 
                    restaurant.averageRating < 2.25))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id} restaurant=
                      {filteredRestaurant}/>) : 

                ratingOption === 2.5 ? restaurants.filter(
                  (restaurant) => (restaurant.averageRating >= 2.25 
                    && restaurant.averageRating < 2.875))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id} restaurant=
                    {filteredRestaurant}/>) : 

                ratingOption === 3 ? restaurants.filter(
                  (restaurant) => (restaurant.averageRating >= 
                    2.875 && restaurant.averageRating < 3.25))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id} 
                    restaurant={filteredRestaurant}/>) : 

                ratingOption === 3.5 ? restaurants.filter(
                  (restaurant) => (restaurant.averageRating >=
                    3.25 && restaurant.averageRating < 3.875))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id}
                    restaurant={filteredRestaurant}/>) : 

                ratingOption === 4.0 ? restaurants.filter(
                  (restaurant) => (restaurant.averageRating 
                    >= 3.875 && restaurant.averageRating < 4.25))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id}
                    restaurant={filteredRestaurant}/>) : 

                ratingOption === 4.5 ? restaurants.filter(
                  (restaurant) => (restaurant.averageRating >= 4.25 
                    && restaurant.averageRating < 4.875))
                    .map((filteredRestaurant) => 
                    <Restaurant key={filteredRestaurant.id} 
                    restaurant={filteredRestaurant}/>) : 

                restaurants.filter((restaurant) => 
                (restaurant.averageRating >= 4.875))
                  .map((filteredRestaurant) =>
                  <Restaurant key={filteredRestaurant.id}
                    restaurant={filteredRestaurant} />) 
                                        
              }

            </div>
          </div>
        </div>

        <div className="right-side-bar">
          <div className="google-map">
            <MapBuilder restaurants={restaurants} />
          </div>
        </div>

      </div>
    </>
  );
}

export default RatingFilteredResult;