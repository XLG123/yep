import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, fetchRestaurants } from "../../../store/restaurants";
import Loading from "../../Loading/Loading";
import MapBuilder from "../../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Restaurant from "../Restaurant";
import Filter from "./Filter";

const CategoryFilteredResult = () => {
  const dispatch = useDispatch();
  let categoryOption = useLocation().pathname.slice(22);
  categoryOption = categoryOption[0].toUpperCase() + categoryOption.slice(1);
  // console.log(categoryOption);
  const restaurants = useSelector(getRestaurants);
  const [finishLoading, setFinishLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurants());
    setTimeout(() => {
      setFinishLoading(true);
    }, 2000);
  }, []);

  return (
    <>
      <div className="bp-line-break"></div>
      {!finishLoading ? <Loading /> :
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
                (categoryOption)).map((filteredRestaurant) =>
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
      }
    </>
  );
}

export default CategoryFilteredResult;