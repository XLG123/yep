import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useRef, useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState("");

  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    ref.current.blur();
    setSearchParams("");
    navigate(`/restaurants/search?value=${searchParams}`, {replace: true});
  }

  return (
    <>
      <span id="search-bar-content">
      <form ref={ref} onSubmit={(e)=>handleSearch(e)} >
        <input type="text" placeholder="Pizza, Ramen, Sushi..." 
          value={searchParams} 
          onChange={(e) => setSearchParams(e.target.value)} id="search-bar" />

        <div tabIndex={0} className="nav-bar-btn red-btn" id="search-bar-btn"
          onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </div>
      </form>
      </span>
    </>
  );
}

export default SearchBar;