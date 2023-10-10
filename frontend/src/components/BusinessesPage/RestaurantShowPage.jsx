import { useNavigate, useParams } from "react-router-dom";
import { fetchRestaurant, getRestaurant } from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AverageRating from "./AverageRating";
import "./RestaurantShowPage.css";
import Loading from "../Loading/Loading";
import ShowPageMap from "../MapBuilder/ShowPageMap";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import IosShareIcon from "@mui/icons-material/IosShare";
import PhoneIcon from "@mui/icons-material/Phone";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LaunchIcon from "@mui/icons-material/Launch";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import RecommendIcon from "@mui/icons-material/Recommend";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { deleteReview, fetchReviews } from "../../store/reviews";
import ReviewRating from "./ReviewRating";
import Yeplogo from "../../assets/images/yepLogo2.png";

const RestaurantShowPage = () => {
  const url = window.location.href;

  const [finishLoading, setFinishLoading] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const { restaurantId } = useParams();

  const restaurant = useSelector(getRestaurant(restaurantId));

  let restReviews = [];

  const reviewExamples = useSelector((state) => state.reviews.reviews);
  if (reviewExamples) {
    Object.values(reviewExamples).forEach((review) => {
      if (review.businessId == restaurantId) {
        restReviews.push(review);
      }
    });
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);

  const [restaurantOpen, setRestaurantOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleAnchorClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const showModal = () => {
    handleClose();
    handleOpenModal();
  };

  const handleUpdate = (e, reviewId) => {
    e.preventDefault();
    handleClose();
    navigate(`/reviews/${reviewId}/updateareview`);
  };

  const handleRemove = (e, reviewId) => {
    e.preventDefault();
    handleCloseModal();
    dispatch(deleteReview(reviewId));
  };

  const myBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderColor: "rgba(235,235,235,1)",
    borderRadius: "5px",
    boxShadow: 50,
    padding: "2.8em",
  };

  const handleClick = (e) => {
    if (sessionUser) {
      navigate(`/restaurants/${restaurantId}/writeareview`);
    } else {
      navigate("/login");
    }
  };

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

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
    setTimeout(() => {
      setFinishLoading(true);
    }, 1500);
  }, [restaurantId]);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
    dispatch(fetchReviews());
  }, [restReviews?.length]);

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  if (restaurant?.mon !== "Not available") {
    setTimeout(() => {
      let currentDate = new Date();
      let day = currentDate.getDay();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();

      if (day === 0) {
        setSun(true);
      } else if (day === 1) {
        setMon(true);
      } else if (day === 2) {
        setTue(true);
      } else if (day === 3) {
        setWed(!false);
      } else if (day === 4) {
        setThu(true);
      } else if (day === 5) {
        setFri(true);
      } else if (day === 6) {
        setSat(true);
      }

      if (hours < 12) {
        if (mon) {
          if (restaurant?.mon === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.mon.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.monOptional?.length > 1) {
              am = restaurant?.monOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (tue) {
          if (restaurant?.tue === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.tue.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.tueOptional?.length > 1) {
              am = restaurant?.tueOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (wed) {
          if (restaurant?.wed === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.wed.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.wedOptional?.length > 1) {
              am = restaurant?.wedOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (thu) {
          if (restaurant?.thu === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.thu.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.thuOptional?.length > 1) {
              am = restaurant?.thuOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (fri) {
          if (restaurant?.fri === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.fri.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.friOptional?.length > 1) {
              am = restaurant?.friOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (sat) {
          if (restaurant?.sat === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.sat.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.satOptional?.length > 1) {
              am = restaurant?.satOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        } else if (sun) {
          if (restaurant?.sun === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.sun.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("AM")) {
              if (hours > amHr) {
                setRestaurantOpen(true);
              } else if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.sunOptional?.length > 1) {
              am = restaurant?.sunOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("AM")) {
                if (hours > amHr) {
                  setRestaurantOpen(true);
                } else if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }
          }
        }
      } else if (hours > 12) {
        const currentHr = hours - 12;
        if (mon) {
          if (restaurant?.mon === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.mon.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.monOptional?.length > 1) {
              pm = restaurant?.monOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (tue) {
          if (restaurant?.tue === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.tue.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.tueOptional?.length > 1) {
              pm = restaurant?.tueOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (wed) {
          if (restaurant?.wed === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.wed.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.wedOptional?.length > 1) {
              pm = restaurant?.wedOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (thu) {
          if (restaurant?.thu === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.thu.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.thuOptional?.length > 1) {
              pm = restaurant?.thuOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (fri) {
          if (restaurant?.fri === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.fri.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.friOptional?.length > 1) {
              pm = restaurant?.friOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (sat) {
          if (restaurant?.sat === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.sat.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.satOptional?.length > 1) {
              pm = restaurant?.satOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (sun) {
          if (restaurant?.sun === "Closed") {
            setRestaurantOpen(false);
          } else {
            let pm = restaurant?.sun.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currentHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currentHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.sunOptional?.length > 1) {
              pm = restaurant?.sunOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currentHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currentHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        }
      } else {
        const currHr = hours - 12;
        if (mon) {
          if (restaurant?.mon === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.mon.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.monOptional?.length > 1) {
              am = restaurant?.monOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.mon.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.monOptional?.length > 1) {
              pm = restaurant?.monOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (tue) {
          if (restaurant?.tue === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.tue.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.tueOptional?.length > 1) {
              am = restaurant?.tueOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.tue.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.tueOptional?.length > 1) {
              pm = restaurant?.tueOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (wed) {
          if (restaurant?.wed === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.wed.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.wedOptional?.length > 1) {
              am = restaurant?.wedOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.wed.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.wedOptional?.length > 1) {
              pm = restaurant?.wedOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (thu) {
          if (restaurant?.thu === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.thu.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.thuOptional?.length > 1) {
              am = restaurant?.thuOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.thu.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.thuOptional?.length > 1) {
              pm = restaurant?.thuOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (fri) {
          if (restaurant?.fri === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.fri.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.friOptional?.length > 1) {
              am = restaurant?.friOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.fri.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.friOptional?.length > 1) {
              pm = restaurant?.friOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (sat) {
          if (restaurant?.sat === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.sat.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.satOptional?.length > 1) {
              am = restaurant?.satOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.sat.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.satOptional?.length > 1) {
              pm = restaurant?.satOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        } else if (sun) {
          if (restaurant?.sun === "Closed") {
            setRestaurantOpen(false);
          } else {
            let am = restaurant?.sun.split(" - ")[0];
            let [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.sunOptional?.length > 1) {
              am = restaurant?.sunOptional.split(" - ")[0];
              [amHr, amMin] = am.split(":");
              amMin = amMin.slice(0, -3);
              if (am.includes("PM")) {
                if (hours == amHr && minutes >= amMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            let pm = restaurant?.sun.split(" - ")[1];
            let [pmHr, pmMin] = pm.split(":");
            pmMin = pmMin.slice(0, -3);
            if (pm.includes("PM")) {
              if (currHr < pmHr) {
                setRestaurantOpen(true);
              } else if (currHr == pmHr && minutes <= pmMin) {
                setRestaurantOpen(true);
              }
            }

            if (restaurant?.sunOptional?.length > 1) {
              pm = restaurant?.sunOptional.split(" - ")[1];
              [pmHr, pmMin] = pm.split(":");
              pmMin = pmMin.slice(0, -3);
              if (pm.includes("PM")) {
                if (currHr < pmHr) {
                  setRestaurantOpen(true);
                } else if (currHr == pmHr && minutes <= pmMin) {
                  setRestaurantOpen(true);
                }
              }
            }

            if (pm.includes("Next Day") || pm.includes("Next day")) {
              setRestaurantOpen(true);
            }
          }
        }
      }
    }, 500);
  }

  return (
    <>
      {!finishLoading ? (
        <Loading />
      ) : (
        <div className="sp-wrapper">
          {restaurant && (
            <div className="restaurant-sp-container">
              <div className="main-bg-scrollable-container">
                <div className="bg">
                  <img
                    src={restaurant.pictureUrls[0]}
                    alt="restaurant"
                    className="bg-img"
                  />
                </div>

                <div className="bg">
                  <img
                    src={restaurant.pictureUrls[1]}
                    alt="restaurant"
                    className="bg-img"
                  />
                </div>

                <div className="bg">
                  <img
                    src={restaurant.pictureUrls[2]}
                    alt="restaurant"
                    className="bg-img"
                  />
                </div>

                <div className="bg">
                  <img
                    src={restaurant.pictureUrls[3]}
                    alt="restaurant"
                    className="bg-img"
                  />
                </div>

                <div className="bg">
                  <img
                    src={restaurant.pictureUrls[4]}
                    alt="restaurant"
                    className="bg-img"
                  />
                </div>
              </div>

              <div className="unscrollable-info">
                <div className="sp-title">{restaurant.name}</div>

                <div
                  className={
                    restaurant.averageRating === 0
                      ? "sp-avg-rating"
                      : "sp-avg-rating-updated"
                  }
                >
                  {
                    <AverageRating
                      averageRating={restaurant.averageRating}
                      totalReviews={restaurant.totalReviews}
                    />
                  }
                </div>

                <div className="sp-category-container">
                  {restaurant.claimed === true ? (
                    <span className="sp-rest-claimed">
                      <span>
                        <CheckCircleIcon
                          sx={{ fontSize: "inherit", marginRight: "0.35vw" }}
                        />
                      </span>
                      <span>
                        <Tooltip
                          title="This business is eligible to be claimed by a local representative in addition to corporate."
                          placement="top-end"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: "#2D2E2F",
                                fontSize: "1vw",
                                textAlign: "justify",
                                padding: "1em",
                                lineHeight: "1.3em",
                                maxWidth: "20vw",
                              },
                            },
                            arrow: { sx: { color: "#2D2E2F" } },
                          }}
                          arrow
                        >
                          <span>Claimed</span>
                        </Tooltip>
                      </span>
                    </span>
                  ) : (
                    <span className="sp-rest-notclaimed">
                      <span>
                        <Tooltip
                          title="This business has not yet been claimed by the owner or a representative."
                          placement="top-end"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: "#2D2E2F",
                                fontSize: "1vw",
                                textAlign: "justify",
                                padding: "1em",
                                lineHeight: "1.3em",
                                maxWidth: "20vw",
                              },
                            },
                            arrow: { sx: { color: "#2D2E2F" } },
                          }}
                          arrow
                        >
                          <span>Unclaimed</span>
                        </Tooltip>
                      </span>
                      <span>
                        <ErrorIcon
                          sx={{
                            fontSize: "inherit",
                            marginLeft: "0.35vw",
                            marginRight: "1vw",
                          }}
                        />
                      </span>
                    </span>
                  )}
                  <span className="sp-price-range">
                    <span className="bullet-pt">&#9679;</span>{" "}
                    {restaurant.priceRange}{" "}
                    <span className="bullet-pt">&#9679;</span>{" "}
                  </span>
                  <span>{restaurant.category.replace("_", " ")}</span>
                </div>

                <div className="sp-rest-current-status-container">
                  {mon && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.mon}</span>
                      {restaurant.monOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.monOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {mon && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.mon}</span>
                      {restaurant.monOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.monOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {tue && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.tue}</span>
                      {restaurant.tueOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.tueOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {tue && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.tue}</span>
                      {restaurant.tueOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.tueOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {wed && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.wed}</span>
                      {restaurant.wedOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.wedOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {wed && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.wed}</span>
                      {restaurant.wedOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.wedOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {thu && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.thu}</span>
                      {restaurant.thuOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.thuOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {thu && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.thu}</span>
                      {restaurant.thuOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.thuOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {fri && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.fri}</span>
                      {restaurant.friOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.friOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {fri && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.fri}</span>
                      {restaurant.friOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.friOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {sat && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.sat}</span>
                      {restaurant.satOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.satOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {sat && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.sat}</span>
                      {restaurant.satOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.satOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}

                  {sun && restaurantOpen ? (
                    <span>
                      <span className="curr-open-status">Open</span>
                      <span className="curr-rest-hr">{restaurant.sun}</span>
                      {restaurant.sunOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.sunOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  {sun && !restaurantOpen ? (
                    <span>
                      <span className="curr-closed-status">Closed</span>
                      <span className="curr-rest-hr">{restaurant.sun}</span>
                      {restaurant.sunOptional ? (
                        <span className="curr-rest-hr optional-hrs">
                          &nbsp;{restaurant.sunOptional}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="review-btn" onClick={handleClick}>
                <StarOutlineIcon
                  sx={{ fontSize: "1.8vw", marginRight: "0.3em" }}
                  className="sp-btn-icon"
                />
                Write a review
              </div>

              <CopyToClipboard text={url}>
                <div>
                  <div className="share-btn" onClick={(e) => handleCopyLink(e)}>
                    <IosShareIcon
                      sx={{ fontSize: "1.8vw", marginRight: "0.3em" }}
                      className="sp-btn-icon"
                    />
                    Share
                  </div>
                  <Toaster />
                </div>
              </CopyToClipboard>

              <div className="sp-rest-basic-info-container">
                <div className="location-hours-container">
                  <div className="loc-hr-title">
                    <span>Location & Hours</span>
                  </div>
                  <span className="sp-loc-container">
                    <div className="sp-map-container">
                      <ShowPageMap restaurant={restaurant} />
                    </div>

                    <div className="sp-restaurant-addr">
                      {restaurant.address}
                    </div>

                    <div className="sp-restaurant-loc-container">
                      <span className="sp-restaurant-loc">
                        {restaurant.city},
                      </span>
                      <span className="sp-restaurant-loc">
                        {restaurant.state},
                      </span>
                      <span className="sp-restaurant-loc">
                        {restaurant.zipCode}
                      </span>
                    </div>
                  </span>

                  <span className="sp-restaurant-hrs">
                    <div className="day">
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                      <div>Sun</div>
                    </div>

                    <div className="open-hrs">
                      <div>
                        {restaurant.mon}
                        {restaurant.monOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.monOptional}
                          </span>
                        ) : null}
                        {mon && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {mon && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.tue}
                        {restaurant.tueOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.tueOptional}
                          </span>
                        ) : null}
                        {tue && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {tue && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.wed}
                        {restaurant.wedOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.wedOptional}
                          </span>
                        ) : null}
                        {wed && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {wed && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.thu}
                        {restaurant.thuOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.thuOptional}
                          </span>
                        ) : null}
                        {thu && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {thu && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.fri}
                        {restaurant.friOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.friOptional}
                          </span>
                        ) : null}
                        {fri && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {fri && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.sat}
                        {restaurant.satOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.satOptional}
                          </span>
                        ) : null}
                        {sat && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {sat && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>

                      <div>
                        {restaurant.sun}
                        {restaurant.sunOptional ? (
                          <span className="optional-hrs">
                            &nbsp;&nbsp;&nbsp;{restaurant.sunOptional}
                          </span>
                        ) : null}
                        {sun && restaurantOpen ? (
                          <span className="rest-curr-status rest-open-status">
                            &nbsp;Open now
                          </span>
                        ) : null}
                        {sun && !restaurantOpen ? (
                          <span className="rest-curr-status rest-closed-status">
                            &nbsp;Closed now
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </span>
                </div>

                <div
                  className="sp-restaurant-info-box"
                  style={{ color: "#2D2E2F" }}
                >
                  {restaurant.phoneNumber ? (
                    <div className="sp-restaurant-phone sp-rest-info-box">
                      <span className="sp-icon-container">
                        <PhoneIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      ({restaurant.phoneNumber.slice(0, 3)}) -{" "}
                      {restaurant.phoneNumber.slice(3, 6)} -{" "}
                      {restaurant.phoneNumber.slice(6, 10)}
                    </div>
                  ) : (
                    <div className="phone-num-notavailable">
                      <span className="sp-icon-container">
                        <PhoneIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      phone number is not available
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.webUrl !== "N/A" ? (
                    <a
                      href={restaurant.webUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="sp-rest-link sp-rest-info-box"
                    >
                      <span className="sp-icon-container">
                        <LaunchIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      <span className="rest-url">{restaurant.webUrl}</span>
                    </a>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LaunchIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      NO Restaurant Link
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.wifi ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <WifiIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Free Wi-Fi
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <WifiOffIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      NO Wi-Fi
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.healthScore ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <HealthAndSafetyIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Health Score:{" "}
                      <span className="sp-rest-health-score">
                        {restaurant.healthScore}
                      </span>
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <HealthAndSafetyIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      NO Health Scores
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.delivery ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LocalShippingIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Offers Delivery
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LocalShippingIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Doesn't Offer Delivery
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.takeOut ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <TakeoutDiningIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Offers Takeout
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <TakeoutDiningIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      <span className="sp-rest-info-text">
                        Doesn't Offer Takeout
                      </span>
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.reservation ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <EditCalendarIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Takes Reservations
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <EditCalendarIcon
                          className="sp-icon"
                          sx={{ fontSize: "1.7vw" }}
                        />
                      </span>
                      Does Not take reservations
                    </div>
                  )}
                </div>
              </div>

              <div className="sp-rest-reviews-container">
                <div className="reviews-linebreak"></div>
                {restReviews?.length === 0 ? (
                  <div className="empty-reviews-container">
                    Be the first to leave a review
                  </div>
                ) : (
                  <div className="reviews-container">
                    <ul>
                      {restReviews?.reverse().map((userReview) => (
                        <li
                          className="sp-review"
                          key={userReview.businessId + userReview.id}
                        >
                          <div className="reviewer-profile">
                            <Avatar
                              sx={{
                                backgroundColor: "#555",
                                height: "3vw",
                                width: "3vw",
                                fontSize: "1.3vw",
                              }}
                            >
                              {userReview?.reviewerFn[0]}
                              {userReview?.reviewerLn[0]}
                            </Avatar>
                          </div>
                          <div className="reviewer-name">
                            <span>{userReview?.reviewerFn}</span>
                            <span>{userReview?.reviewerLn}</span>
                          </div>
                          {sessionUser?.id === userReview?.userId ? (
                            <span className="more-options-btn">
                              <IconButton
                                id="simple-button"
                                aria-controls={open ? "basic-menu" : null}
                                aria-expanded={open ? "true" : null}
                                aria-haspopup="true"
                                aria-label="Click to show more options"
                                title="More options"
                                onClick={handleAnchorClick}
                                sx={{
                                  fontSize: "1.8vw",
                                  position: "relative",
                                  left: "1.5vw",
                                  "&:hover": { backgroundColor: "#E2E2E6" },
                                }}
                              >
                                <MoreHorizIcon
                                  sx={{ fontSize: "1.8vw", color: "#2D2E2F" }}
                                />
                              </IconButton>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  "aria-labelledby": "simple-button",
                                }}
                                sx={{ lineHeight: "1em" }}
                              >
                                <MenuItem
                                  onClick={(e) =>
                                    handleUpdate(e, userReview.id)
                                  }
                                  sx={{
                                    fontSize: "1vw",
                                    fontWeight: "600",
                                    "&:hover": { backgroundColor: "#E2E2E6" },
                                  }}
                                >
                                  Update Review
                                </MenuItem>
                                <MenuItem
                                  onClick={showModal}
                                  sx={{
                                    fontSize: "1vw",
                                    fontWeight: "600",
                                    "&:hover": { backgroundColor: "#E2E2E6" },
                                  }}
                                >
                                  Remove Review
                                </MenuItem>
                              </Menu>
                              <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box className="modal-content" sx={myBoxStyle}>
                                  <div className="modal-title">
                                    Remove Review
                                  </div>
                                  <div className="modal-text">
                                    Are you sure you want to remove this review?
                                    It can help the restaurants improve their
                                    services the more reviews they get.
                                  </div>
                                  <div className="modal-btn-gp">
                                    <div
                                      className="modal-btn"
                                      onClick={handleCloseModal}
                                    >
                                      Keep Review
                                    </div>
                                    <div
                                      className="modal-btn"
                                      onClick={(e) =>
                                        handleRemove(e, userReview.id)
                                      }
                                    >
                                      Confirm Remove
                                    </div>
                                  </div>
                                </Box>
                              </Modal>
                            </span>
                          ) : null}

                          <div className="sp-review-rating">
                            <ReviewRating
                              averageRating={userReview.rating}
                              ratingTime={
                                new Date(userReview.updatedAt)
                                  .toLocaleString("en-US", {
                                    timeZone: "America/New_York",
                                  })
                                  .split(",")[0]
                              }
                              edited={
                                userReview.createdAt !== userReview.updatedAt
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div className="sp-review-body">
                            {userReview.body}
                          </div>
                          <div className="reaction-button-group">
                            <span className="reaction-btn">
                              <div className="reaction-btn-icon">
                                <LightbulbCircleIcon
                                  sx={{
                                    color: "rgb(138, 141, 144)",
                                    fontSize: "1.8vw",
                                  }}
                                />
                              </div>{" "}
                              <div className="reaction-btn-text">Helpful</div>
                            </span>
                            <span className="reaction-btn">
                              <div className="reaction-btn-icon">
                                <RecommendIcon
                                  sx={{
                                    color: "rgb(138, 141, 144)",
                                    fontSize: "1.8vw",
                                  }}
                                />
                              </div>
                              <div className="reaction-btn-text">Thanks</div>
                            </span>
                            <span className="reaction-btn">
                              <div className="reaction-btn-icon">
                                <FavoriteIcon
                                  sx={{
                                    color: "rgb(138, 141, 144)",
                                    fontSize: "1.8vw",
                                  }}
                                />
                              </div>
                              <div className="reaction-btn-text">Love this</div>
                            </span>
                            <span className="reaction-btn">
                              <div className="reaction-btn-icon">
                                <MoodBadIcon
                                  sx={{
                                    color: "rgb(138, 141, 144)",
                                    fontSize: "1.8vw",
                                  }}
                                />
                              </div>
                              <div className="reaction-btn-text">Oh no</div>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <footer className="sp-rest-footer-container">
                  <div className="yep-footer-description">
                    <div className="yep-name">
                      Yep!
                      <img
                        src={Yeplogo}
                        alt="footer logo"
                        className="yep-name-logo"
                      />
                    </div>
                    <div className="yep-description">
                      An online platform where one can browse local restaurants,
                      write & read reviews.
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
                      <div className="list-second-child">
                        Multiple Language Support
                      </div>
                    </div>
                  </div>

                  <div className="copyright-container">
                    &copy; Copyright 2023{" "}
                    <span className="footer-yeplogo">
                      Yep!
                      <img
                        src={Yeplogo}
                        alt="footer logo"
                        className="yep-copyright-logo"
                      />
                    </span>
                  </div>
                </footer>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantShowPage;
