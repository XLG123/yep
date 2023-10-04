import { useLocation } from "react-router-dom";
import Yeplogo from "../../assets/images/yepLogo2.png";
import "./Footer.css";

const Footer = () => {
  const currUrl = useLocation().pathname;
  // console.log(currUrl.split("/")[2]);

  return (
    <footer
      className={
        currUrl === "/login"
          ? "login-footer-container"
          : currUrl === "/signup"
          ? "signup-footer-container"
          : currUrl === "/"
          ? "hp-footer-container"
          : currUrl === "/restaurants"
          ? "restaurants-footer-container"
          : currUrl === "/restaurants/filter"
          ? "filter-footer-container"
          : currUrl === "/businesses/search"
          ? "search-footer-container"
          : currUrl === "/businesses/error"
          ? "search-error-footer-container"
          : "footer-section-container"
      }
    >
      <div className="yep-footer-description">
        <div className="yep-name">
          Yep!
          <img src={Yeplogo} alt="footer logo" className="yep-name-logo" />
        </div>
        <div className="yep-description">
          An online platform where one can browse local restaurants, write &
          read reviews.
        </div>
      </div>
      <div className="yep-technologies-container">
        <div className="frontend-container">
          <div className="footer-list-title">Frontend</div>
          <div className="list-first-child">React</div>
          <div className="list-second-child">CSS</div>
        </div>
        <div className="backend-container">
          <div className="footer-list-title">Backend</div>
          <div className="list-first-child">Rails</div>
          <div className="list-second-child">PSQL</div>
        </div>
        <div className="other-tech-container">
          <div className="footer-list-title">Technology</div>
          <div className="list-first-child">AWS S3</div>
          <div className="list-second-child">Google Maps API</div>
        </div>
        <div className="upcoming-feature-container">
          <div className="footer-list-title">Upcoming features</div>
          <div className="list-first-child">User Profile</div>
          <div className="list-second-child">Multiple Language Support</div>
        </div>
      </div>
      <div className="copyright-container">
        &copy; Copyright 2023{" "}
        <span className="footer-yeplogo">
          Yep!
          <img src={Yeplogo} alt="footer logo" className="yep-copyright-logo" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
