import "./Filter.css";
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Filter = () => {
  return (
    <>
      <div className="filter-bar-container1">
        <div className="filter-title1">Price Range Filter</div>
        <div className="filter1">
          <button className="filter-btn-group1" id="filter-btn-1"
            >
            $</button>
          <button className="filter-btn-group1" id="filter-btn-2">
            $$</button>
          <button className="filter-btn-group1" id="filter-btn-3">
            $$$</button>
          <button className="filter-btn-group1" id="filter-btn-4">
            $$$$</button>
        </div>
      </div>

      <div className="filter-bar-container2">
        <div className="filter-title2">Zip Code Filter</div>
        <div className="filter2">
          <button className="filter-btn-group2" id="zipcode-btn-1">
            10002</button>
          <button className="filter-btn-group2" id="zipcode-btn-2">
            10003</button>
          <button className="filter-btn-group2" id="zipcode-btn-3">
            10011</button>
          <button className="filter-btn-group2" id="zipcode-btn-4">
            10012</button>
          <button className="filter-btn-group2" id="zipcode-btn-5">
            10013</button>
          <button className="filter-btn-group2" id="zipcode-btn-6">
            10014</button>
        </div>
      </div>

      <div className="filter-bar-container3">
        <div className="filter-title3">Average Rating Filter</div>
        <div className="filter3">
          <div className="one-star-average average-rating-filter">
            <span style={{color: "#C3882E"}}>
              <StarIcon fontSize="inherit"/>
            </span>

            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
            <StarBorderIcon fontSize="inherit"/>
          </div>

          <div className="one-half-average average-rating-filter">
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

          <div className="two-stars-average average-rating-filter">
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

          <div className="two-half-average average-rating-filter">
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

          <div className="three-stars-average average-rating-filter">
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

          <div className="three-half-average average-rating-filter">
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

          <div className="four-stars-average average-rating-filter">
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

          <div className="four-half-average average-rating-filter">
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

          <div className="five-stars-average average-rating-filter">
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