import { NavLink } from "react-router-dom";
import "./ErrorUrl.css";
import Footer from "../Footer/Footer";

const ErrorUrl = () => {
  return (
    <>
      <div className="error-url-container">
        <div className="error-url-text-container">
          <div>We're sorry. We can't find</div>
          <div>the page you're looking for.</div>
          <div className="new-search-container">
            Please try a new{" "}
            <NavLink to="/restaurants" className="new-search-bold">
              search
            </NavLink>
            .
          </div>
        </div>
        <div className="error-url-img-container">
          <img
            src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/1c54cc25ce01/assets/img/svg_illustrations/cant_find_650x520_v2.svg"
            alt="error page"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorUrl;
