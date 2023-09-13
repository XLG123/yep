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

  const realCategoryTerms = [
    "Japanese",
    "Chinese",
    "Thai",
    "French",
    "Italian",
    "Mexican",
    "Milk Tea",
    "Pizza",
    "Ramen",
    "Sushi",
    "Tea",
    "Spagetti",
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
    "jooy tea shoppe",
    "vivi bubble tea",
  ];

  const realNames = [
    "Da Andrea",
    "Olio e Più",
    "Rubirosa",
    "Paesano",
    "L'Antica Pizzeria Da Michele NYC",
    "La Lanterna Di Vittorio",
    "Trapizzino",
    "Babbo",
    "Ribalta Pizza",
    "Lil Frankie's",
    "Joe's Pizza",
    "Xu's Public House",
    "Shu Jiao Fu Zhou",
    "Chow House",
    "Joe's Shanghai",
    "Han Dynasty",
    "Amélie",
    "La Sirene",
    "Claudette",
    "Boucherie Union Square",
    "Buvette",
    "Mino Brasserie",
    "Benemon",
    "Tsuru Ton Tan",
    "Raku",
    "Maison Kintaro",
    "Maki Kosaka",
    "Ootoya Chelsea",
    "Ippudo NY",
    "Oramen",
    "Kyuramen",
    "MIkado",
    "Sushi Nakazawa",
    "Pranakhon Thai Restaurant",
    "Thai Villa",
    "Soothr",
    "Lovemama",
    "Top Thai Vintage",
    "Top Thai Greenwich",
    "Laut",
    "La Cententa Oeste",
    "La Contenta",
    "Rosa Mexicano",
    "Tortaria",
    "El Cantinero",
    "Wanpo Tea Shop",
    "Teazzi Tea Shop",
    "Jooy Tea Shoppe",
    "ViVi Bubble Tea",
  ];

  let dropdownItems = [];

  for (const item of realCategoryTerms) {
    dropdownItems.push(item);
  }

  for (const item of realNames) {
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

  const dropdownSearch = (searchItem, e) => {
    e.preventDefault();
    ref.current.blur();
    setSearchParams("");

    if (categoryTerms.includes(searchItem.toLowerCase())) {
      navigate(`/businesses/search?category=${searchItem}`, {
        replace: true,
      });
      setDropdownItem("");
    } else if (names.includes(searchItem.toLowerCase())) {
      navigate(`/businesses/search?name=${searchItem}`, { replace: true });
      setDropdownItem("");
    } else {
      navigate(`businesses/error?search_term=${searchItem}`, {
        replace: true,
      });
      setDropdownItem("");
    }
  }

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
      {dropdownItem && (
        <div className="search-dropdown-menu" ref={ref}>
          <ul className="dropdown-list">
            {dropdownItems
              .filter((item) =>
                item.toLowerCase().includes(dropdownItem.toLowerCase())
              )
              .map((searchItem, idx) => (
                <li
                  className="dropdown-item"
                  key={idx}
                  onClick={(e) => dropdownSearch(searchItem, e)}
                >
                  {searchItem}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;
