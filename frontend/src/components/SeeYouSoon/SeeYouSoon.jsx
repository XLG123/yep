import SeeYouSoonImage from "../../assets/images/seeyousoon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import IosShareIcon from "@mui/icons-material/IosShare";
import PortraitIcon from "@mui/icons-material/Portrait";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EmailIcon from "@mui/icons-material/Email";
import ResumePDF from "../../assets/files/resume.pdf";
import "./SeeYouSoon.css";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const SeeYouSoon = () => {
  const handleCopyLink = (e) => {
    e.preventDefault();
    toast(`Current Link is copied!`, {
      id: "successful-link",
      style: {
        border: "1px solid rgba(202, 201, 202, 1)",
        fontSize: "1.1.7vw",
        boxShadow: "0px 10px 8px 1px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        height: "1.7vw",
      },
      icon: "✅",
      duration: 2000,
    });
  };

  return (
    <>
      <div className="see-you-soon-line-break"></div>
      <div className="see-you-soon-container">
        <div className="see-you-soon-content">
          <div className="see-you-soon-text">
            <div className="see-you-soon-title">
              <div>Heading out?</div>
              <div>Thanks for visiting Yep!</div>
            </div>
            <div className="see-you-soon-body">
              <p>
                Enjoy using Yep and want to learn more about the developer
                behind this project? Feel free to share the link with others and
                get in touch.
              </p>
              <div className="contact-btns">
                <CopyToClipboard text="https://yep-ech2.onrender.com/">
                  <div>
                    <div
                      className="hp-share-btn"
                      onClick={(e) => handleCopyLink(e)}
                    >
                      <IosShareIcon
                        sx={{ fontSize: "1.5vw", marginRight: "0.3em" }}
                        className="sp-btn-icon"
                      />
                      Share
                    </div>
                    <Toaster />
                  </div>
                </CopyToClipboard>
                <NavLink
                  to="https://xlg123.github.io/"
                  className="portfolio-btn"
                >
                  <PortraitIcon
                    sx={{ fontSize: "1.5vw", marginRight: "0.3em" }}
                  />
                  Portfolio
                </NavLink>
                <a
                  href={ResumePDF}
                  download="Xiao-Lin-Guan-Resume"
                  rel="noreferrer"
                  className="resume-btn"
                >
                  <DescriptionIcon
                    sx={{ fontSize: "1.5vw", marginRight: "0.3em" }}
                  />
                  Resume
                </a>
              </div>
              <div className="developer-tel-email-container">
                <div className="developer-tel-container">
                  <div className="developer-tel">+1 (646)-750-5019</div>

                  <Tooltip
                    title="Make a call"
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#999",
                          fontSize: "0.9vw",
                          textAlign: "justify",
                          padding: "0.5em",
                          lineHeight: "1.1em",
                        },
                      },
                      arrow: { sx: { color: "#999" } },
                    }}
                    arrow
                  >
                    <a href="tel:+6467505019" className="contact-link">
                      <AddIcCallIcon
                        sx={{
                          fontSize: "1.4vw",
                          color: "#999",
                          "&:hover": { color: "#777" },
                        }}
                      />
                    </a>
                  </Tooltip>
                </div>
                <div className="developer-email-container">
                  <div className="developer-email">
                    xiaolin.guan123@gmail.com
                  </div>
                  
                  <Tooltip
                    title="Send an email"
                    placement="bottom"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#999",
                          fontSize: "0.9vw",
                          textAlign: "justify",
                          padding: "0.5em",
                          lineHeight: "1.1em",
                        },
                      },
                      arrow: { sx: { color: "#999" } }, 
                    }}
                    arrow
                  >

                    <a
                      href="mailto: xiaolin.guan123@gmail.com"
                      className="contact-link"
                    >
                      <EmailIcon
                        sx={{
                          fontSize: "1.4vw",
                          color: "#999",
                          "&:hover": { color: "#777" },
                        }}
                      />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="see-you-soon-picture">
            <img src={SeeYouSoonImage} alt="see you soon frame" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeYouSoon;
