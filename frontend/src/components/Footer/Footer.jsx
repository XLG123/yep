import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {

  const currUrl = useLocation().pathname;
  console.log(currUrl);

  return (
    <div className="footer-section-container">
      hi from footer section
    </div>
  )
}

export default Footer;