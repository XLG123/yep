import React from "react";
import "./BusinessesPage.css";
import { useParams } from "react-router-dom";

const BusinessesPage = () => {
  const searchItem = useParams().searchItem;
  return (
    <>
      <div className="bp-line-break"></div>

      <div className="business-page-container">

        <div className="left-side-bar">
          <div className="filter-bar-container">
            <div className="filter-title">Price Range Filter</div>
            <div className="filter">
              <button className="filter-btn-group" id="filter-btn-1">
                $</button>
              <button className="filter-btn-group" id="filter-btn-2">
                $$</button>
              <button className="filter-btn-group" id="filter-btn-3">
                $$$</button>
              <button className="filter-btn-group" id="filter-btn-4">
                $$$$</button>
            </div>
          </div>

          <div className="recommendation-container">

          </div>
        </div>
        
        <div className="main-content">
          <div className="search-result-container">
            <h1 className="search-result-title">
              Search Result for '{searchItem}' </h1>
            <div className="scrollable-result-container">
              {/* businesses will be displayed here */}
            </div>
          </div>
        </div>

        <div className="right-side-bar">
          <div className="search-result-googlemap">
            
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessesPage;