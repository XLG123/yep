import { useLocation } from "react-router-dom";
import CategoryFilteredResult from "./CategoryFilteredResult";
import PriceRangeFilteredResult from "./PriceRangeFilteredResult";
import ZipCodeFilteredResult from "./ZipCodeFilteredResult";
import Loading from "../../Loading/Loading";
import { useEffect, useState } from "react";
import RatingFilteredResult from "./RatingFilteredResult";
import { useDispatch } from "react-redux";
import { fetchRestaurants } from "../../../store/restaurants";

const FilteredResult = () => {
  const filterOption = useLocation().search;
  const [finishLoading, setFinishLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
    setTimeout(() => {
      setFinishLoading(true);
    }, 2000);
  }, [dispatch]);

  // TODO: need to fix loading page 
  // (it only renders after the clicking back Restaurants)
  // console.log(finishLoading);

  return (
    <>
      {!finishLoading ? <Loading/> : 
        <div>
          {filterOption.includes("category") ? <CategoryFilteredResult /> :
            filterOption.includes("price_range") ? <PriceRangeFilteredResult /> 
            : filterOption.includes("zip_code") ? <ZipCodeFilteredResult /> : 
            <RatingFilteredResult />}
        </div>}

    </>
  )
}

export default FilteredResult;