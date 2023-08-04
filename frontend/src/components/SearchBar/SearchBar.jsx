import "./SearchBar.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // useEffect(() => {

  // }, [searchTerm])

  const handleSearch = () => {
    
  }

  return (
    <>
      <span id="search-bar-content">
        <input type="text" placeholder="Pizza, Ramen, Sushi..." 
        id="search-bar" />

        <div className="nav-bar-btn red-btn" id="search-bar-btn"
        onClick={handleSearch} onKeyDown={handleSearch}>
          <i className="fa fa-search"></i>
        </div>
      </span>
    </>
  );
}

export default SearchBar;