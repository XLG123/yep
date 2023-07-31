import { useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurants";
import MapBuilder from "../../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import Restaurant from "../Restaurant";
import Filter from "./Filter";

const ZipCodeFilteredResult = () => {
  let zipCodeOption = useLocation().pathname.slice(22);
  zipCodeOption = zipCodeOption[0].toUpperCase() +
    zipCodeOption.slice(1);
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
              {zipCodeOption ? `New York City, New York, ${zipCodeOption}` :
                "Restaurants"}
            </h1>
            <div className="scrollable-result-container">
              {restaurants.filter((restaurant) =>
                restaurant.zipCode ===
                (zipCodeOption)).map((filteredRestaurant) =>
                  <Restaurant key={filteredRestaurant.id} restaurant=
                    {filteredRestaurant} />)}
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

export default ZipCodeFilteredResult;