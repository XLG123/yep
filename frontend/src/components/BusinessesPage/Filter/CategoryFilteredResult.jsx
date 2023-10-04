import { useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurants";
import MapBuilder from "../../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import Restaurant from "../Restaurant";
import Filter from "./Filter";
import Footer from "../../Footer/Footer";

const CategoryFilteredResult = () => {
  let categoryOption = useLocation().search.slice(10);
  categoryOption = categoryOption[0].toUpperCase() + categoryOption.slice(1);
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
              {categoryOption ? `${categoryOption} Cuisine` : "Restaurants"}
              </h1>
            <div className="scrollable-result-container">
              {restaurants.filter((restaurant) => 
              restaurant.category.includes 
              (categoryOption)).map((filteredRestaurant, idx) =>
                <Restaurant key={filteredRestaurant.id} restaurant=
                {filteredRestaurant} index={idx}/>)}
            </div>
          </div>
        </div>

        <div className="right-side-bar">
          <div className="google-map">
            <MapBuilder restaurants={restaurants.filter((restaurant) => 
              restaurant.category.includes(categoryOption))} />
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default CategoryFilteredResult;