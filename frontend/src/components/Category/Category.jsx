import React from "react";
import "./Category.css";
import { NavLink } from "react-router-dom";

const CategoryMenu = ({location}) => {

  const searchItems = ['Italian', 'Chinese', 'French', 'Japanese', 'Thai', 
  'Mexican'];

  return (
    <div className={location === "/" ? "hp-category-container" 
    : "non-hp-category-container"}>
      {searchItems.map((item) => 
        <NavLink to={`/search/${item}`} 
          key={item} className={location === "/" ? "hp-category-dropdown" : "non-hp-category-dropdown"}> {item} </NavLink>)}
    </div>
  );
}

export default CategoryMenu;