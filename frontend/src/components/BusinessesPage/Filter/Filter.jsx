import "./Filter.css";
import React, { useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const Filter = () => {
  const navigate = useNavigate();

  const handlePriceFilterClick = (e, price) => {
    e.preventDefault();
    e.target.style.backgroundColor = "rgb(226, 226, 230)";
    const siblings = [...e.target.parentElement.children].filter(el => el != e.target);
    siblings.forEach(sibling => {
      sibling.style.backgroundColor = "white";
    });
    navigate(`/restaurants/filter?price_range=${price}`);
  }

  const handleZipCodeFilterClick = (e, zipCode) => {
    e.preventDefault();
    e.target.classList.add("activeBtn");
    e.target.style.backgroundColor = "rgb(226, 226, 230)";
    const siblings = [...e.target.parentElement.children].filter(el => el != e.target);
    siblings.forEach(sibling => {
      sibling.style.backgroundColor = "white";
    });
    navigate(`/restaurants/filter?zip_code=${zipCode}`);
  }

  const handleRatingFilterClick = (e, averageRating) => {
    e.preventDefault();
    navigate(`/restaurants/filter?average_rating=${averageRating}`);
  }

  return (
    <>
      <div className="filter-bar-container1">
        <div className="filter-title1">Price Range Filter</div>
        <div className="filter1">

          <button className="filter-btn-group1" id="filter-btn-1"
            onClick={(e) => handlePriceFilterClick(e, "$")}>
            $
          </button>

          <button className="filter-btn-group1" id="filter-btn-2"
            onClick={(e) => handlePriceFilterClick(e, "$$")}>
            $$
          </button>

          <button className="filter-btn-group1" id="filter-btn-3"
            onClick={(e) => handlePriceFilterClick(e, "$$$")}>
            $$$
          </button>

          <button className="filter-btn-group1" id="filter-btn-4"
            onClick={(e) => handlePriceFilterClick(e, "$$$$")}>
            $$$$
          </button>

        </div>
      </div>

      <div className="filter-bar-container2">
        <div className="filter-title2">Zip Code Filter</div>
        <div className="filter2">

          <button className="filter-btn-group2" id="zipcode-btn-1"
            onClick={(e) => handleZipCodeFilterClick(e, "10002")}>
            10002
          </button>

          <button className="filter-btn-group2" id="zipcode-btn-2"
            onClick={(e) => handleZipCodeFilterClick(e, "10003")}>
            10003
          </button>

          <button className="filter-btn-group2" id="zipcode-btn-3"
            onClick={(e) => handleZipCodeFilterClick(e, "10011")}>
            10011
          </button>

          <button className="filter-btn-group2" id="zipcode-btn-4"
            onClick={(e) => handleZipCodeFilterClick(e, "10012")}>
            10012
          </button>

          <button className="filter-btn-group2" id="zipcode-btn-5"
            onClick={(e) => handleZipCodeFilterClick(e, "10013")}>
            10013
          </button>

          <button className="filter-btn-group2" id="zipcode-btn-6"
            onClick={(e) => handleZipCodeFilterClick(e, "10014")}>
            10014
          </button>

        </div>
      </div>

      <div className="filter-bar-container3">
        <div className="filter-title3">Average Rating Filter</div>
        <div className="filter3">
          <div className="one-star-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 1.0)}>
            <span style={{color: "#C3882E"}}>
              <StarIcon fontSize="inherit"/>
            </span>

            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="one-half-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 1.5)}>
            <span style={{ color: "#C3882E" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#C3882E" }}>
              <StarHalfIcon fontSize="inherit"/>
            </span>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="two-stars-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 2.0)}>
            <span style={{ color: "#D5B53E" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D5B53E" }}>
              <StarIcon fontSize="inherit"/>
            </span>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="two-half-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 2.5)}>
            <span style={{ color: "#D5B53E" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D5B53E" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D5B53E" }}>
              <StarHalfIcon fontSize="inherit"/>
            </span>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="three-stars-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 3.0)}>
            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="three-half-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 3.5)}>
            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#E5A038" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#E5A038" }}>
              <StarHalfIcon fontSize="inherit"/>
            </span>

            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="four-stars-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 4.0)}>
            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <StarBorderIcon fontSize="inherit"/>            
          </div>

          <div className="four-half-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 4.5)}>
            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#EB6F3D" }}>
              <StarIcon fontSize="inherit"/>
            </span>    

            <span style={{ color: "#EB6F3D" }}>
              <StarHalfIcon fontSize="inherit"/>
            </span>
          </div>

          <div className="five-stars-average average-rating-filter"
            onClick={(e) => handleRatingFilterClick(e, 5.0)}>
            <span style={{ color: "#D22E21" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D22E21" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D22E21" }}>
              <StarIcon fontSize="inherit"/>
            </span>

            <span style={{ color: "#D22E21" }}>
              <StarIcon fontSize="inherit"/>
            </span>    

            <span style={{ color: "#D22E21" }}>
              <StarIcon fontSize="inherit"/>
            </span>
          </div>

        </div>
      </div>


    </>
  );
}

export default Filter;