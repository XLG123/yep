import { useEffect, useState } from "react";
import Filter from "../BusinessesPage/Filter/Filter";
import Loading from "../Loading/Loading";
import MapBuilder from "../MapBuilder/MapBuilder";
import { useLocation } from "react-router-dom";
import "./SearchError.css";
import Footer from "../Footer/Footer";

const SearchError = () => {
  const [finishLoading, setFinishLoading] = useState(false);

  let errorSearchTerm = useLocation().search.slice(13);
  errorSearchTerm = errorSearchTerm.replace(/%20/g, " ");

  useEffect(() => {
    setTimeout(() => {
      setFinishLoading(true);
    }, 2000);
  }, []);

  return (
    <>
      <div className="bp-line-break"></div>

      {!finishLoading ? (
        <Loading />
      ) : (
        <>
          <div className="business-page-container">
            <div className="left-side-bar">
              <Filter />
            </div>

            <div className="main-content">
              <div className="search-result-container">
                <div className="search-error-container">
                  <h1>
                    No Search Result for
                    <span id="empty-space-holder"> </span>
                    <span id="error-term">{errorSearchTerm}</span>
                  </h1>
                  <p>Try typing something else...</p>
                </div>
              </div>
            </div>

            <div className="right-side-bar">
              <div className="google-map">
                <MapBuilder />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default SearchError;
