import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useRef, useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState("");
  const [dropdownItem, setDropdownItem] = useState("");

  const ref = useRef(null);

  const navigate = useNavigate();

  const categoryTerms = [
    "japanese",
    "chinese",
    "thai",
    "french",
    "italian",
    "mexican",
    "milk tea",
    "pizza",
    "ramen",
    "sushi",
    "tea",
    "spagetti",
  ];

  const names = [
    "da andrea",
    "olio e più",
    "rubirosa",
    "paesano",
    "l'antica pizzeria da michele nyc",
    "la lanterna di vittorio",
    "trapizzino",
    "babbo",
    "ribalta pizza",
    "lil frankie's",
    "joe's pizza",
    "xu's public house",
    "shu jiao fu zhou",
    "chow house",
    "joe's shanghai",
    "han dynasty",
    "amélie",
    "la sirene",
    "claudette",
    "boucherie union square",
    "buvette",
    "mino brasserie",
    "benemon",
    "tsuru ton tan",
    "raku",
    "maison kintaro",
    "maki kosaka",
    "ootoya chelsea",
    "ippudo ny",
    "oramen",
    "kyuramen",
    "mikado",
    "sushi nakazawa",
    "pranakhon thai restaurant",
    "thai villa",
    "soothr",
    "lovemama",
    "top thai vintage",
    "top thai greenwich",
    "laut",
    "la cententa oeste",
    "la contenta",
    "rosa mexicano",
    "tortaria",
    "el cantinero",
    "wanpo tea shop",
    "teazzi tea shop",
    "jooy tea shoope",
    "vivi bubble tea",
  ];

  let dropdownItems = [];

  for (const item of categoryTerms) {
    dropdownItems.push(item);
  }

  for (const item of names) {
    dropdownItems.push(item);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    ref.current.blur();
    setSearchParams("");

    if (categoryTerms.includes(searchParams.toLowerCase())) {
      navigate(`/businesses/search?category=${searchParams}`, {
        replace: true,
      });
    } else if (names.includes(searchParams.toLowerCase())) {
      navigate(`/businesses/search?name=${searchParams}`, { replace: true });
    } else {
      navigate(`businesses/error?search_term=${searchParams}`, {
        replace: true,
      });
    }
  };

  return (
    <>
      <span id="search-bar-content">
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            ref={ref}
            type="text"
            placeholder="Pizza, Ramen, Sushi..."
            value={searchParams}
            autoComplete="off"
            onChange={(e) => setSearchParams(e.target.value)}
            onInput={(e) => setDropdownItem(e.target.value)}
            id="search-bar"
          />

          <div
            tabIndex={0}
            className="nav-bar-btn red-btn"
            id="search-bar-btn"
            onClick={handleSearch}
          >
            <i className="fa fa-search"></i>
          </div>
        </form>
      </span>
      {dropdownItem && 
        <div className="dropdown-menu">
          12345 english testing
        </div>}
    </>
  );
};

export default SearchBar;
