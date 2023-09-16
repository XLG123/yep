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
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";

const RestaurantShowPage = () => {
  const url = window.location.href;

  const [finishLoading, setFinishLoading] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const { restaurantId } = useParams();

  const restaurant = useSelector(getRestaurant(restaurantId));

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
        fontSize: "1.2vw",
        boxShadow: "0px 10px 8px 1px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        height: "2vw",
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
        if (restaurant.mon === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.mon.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.monOptional?.length > 1) {
            am = restaurant.monOptional.split(" - ")[0];
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
        if (restaurant.tue === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.tue.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.tueOptional?.length > 1) {
            am = restaurant.tueOptional.split(" - ")[0];
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
        if (restaurant.wed === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.wed.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.wedOptional?.length > 1) {
            am = restaurant.wedOptional.split(" - ")[0];
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
        if (restaurant.thu === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.thu.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.thuOptional?.length > 1) {
            am = restaurant.thuOptional.split(" - ")[0];
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
        if (restaurant.fri === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.fri.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.friOptional?.length > 1) {
            am = restaurant.friOptional.split(" - ")[0];
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
        if (restaurant.sat === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.sat.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.satOptional?.length > 1) {
            am = restaurant.satOptional.split(" - ")[0];
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
        if (restaurant.sun === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.sun.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("AM")) {
            if (hours > amHr) {
              setRestaurantOpen(true);
            } else if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.sunOptional?.length > 1) {
            am = restaurant.sunOptional.split(" - ")[0];
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
        if (restaurant.mon === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.mon.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.monOptional?.length > 1) {
            pm = restaurant.monOptional.split(" - ")[1];
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
        if (restaurant.tue === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.tue.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.tueOptional?.length > 1) {
            pm = restaurant.tueOptional.split(" - ")[1];
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
        if (restaurant.wed === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.wed.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.wedOptional?.length > 1) {
            pm = restaurant.wedOptional.split(" - ")[1];
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
        if (restaurant.thu === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.thu.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.thuOptional?.length > 1) {
            pm = restaurant.thuOptional.split(" - ")[1];
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
        if (restaurant.fri === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.fri.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.friOptional?.length > 1) {
            pm = restaurant.friOptional.split(" - ")[1];
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
        if (restaurant.sat === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.sat.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.satOptional?.length > 1) {
            pm = restaurant.satOptional.split(" - ")[1];
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
        if (restaurant.sun === "Closed") {
          setRestaurantOpen(false);
        } else {
          let pm = restaurant.sun.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currentHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currentHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.sunOptional?.length > 1) {
            pm = restaurant.sunOptional.split(" - ")[1];
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
        if (restaurant.mon === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.mon.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.monOptional?.length > 1) {
            am = restaurant.monOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.mon.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.monOptional?.length > 1) {
            pm = restaurant.monOptional.split(" - ")[1];
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
        if (restaurant.tue === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.tue.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.tueOptional?.length > 1) {
            am = restaurant.tueOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.tue.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.tueOptional?.length > 1) {
            pm = restaurant.tueOptional.split(" - ")[1];
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
        if (restaurant.wed === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.wed.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.wedOptional?.length > 1) {
            am = restaurant.wedOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.wed.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.wedOptional?.length > 1) {
            pm = restaurant.wedOptional.split(" - ")[1];
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
        if (restaurant.thu === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.thu.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.thuOptional?.length > 1) {
            am = restaurant.thuOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.thu.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.thuOptional?.length > 1) {
            pm = restaurant.thuOptional.split(" - ")[1];
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
        if (restaurant.fri === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.fri.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.friOptional?.length > 1) {
            am = restaurant.friOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.fri.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.friOptional?.length > 1) {
            pm = restaurant.friOptional.split(" - ")[1];
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
        if (restaurant.sat === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.sat.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.satOptional?.length > 1) {
            am = restaurant.satOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.sat.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.satOptional?.length > 1) {
            pm = restaurant.satOptional.split(" - ")[1];
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
        if (restaurant.sun === "Closed") {
          setRestaurantOpen(false);
        } else {
          let am = restaurant.sun.split(" - ")[0];
          let [amHr, amMin] = am.split(":");
          amMin = amMin.slice(0, -3);
          if (am.includes("PM")) {
            if (hours == amHr && minutes >= amMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.sunOptional?.length > 1) {
            am = restaurant.sunOptional.split(" - ")[0];
            [amHr, amMin] = am.split(":");
            amMin = amMin.slice(0, -3);
            if (am.includes("PM")) {
              if (hours == amHr && minutes >= amMin) {
                setRestaurantOpen(true);
              }
            }
          }

          let pm = restaurant.sun.split(" - ")[1];
          let [pmHr, pmMin] = pm.split(":");
          pmMin = pmMin.slice(0, -3);
          if (pm.includes("PM")) {
            if (currHr < pmHr) {
              setRestaurantOpen(true);
            } else if (currHr == pmHr && minutes <= pmMin) {
              setRestaurantOpen(true);
            }
          }

          if (restaurant.sunOptional?.length > 1) {
            pm = restaurant.sunOptional.split(" - ")[1];
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

  return (
    <>
      {!finishLoading ? (
        <Loading />
      ) : (
        <>
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

                <div className="sp-avg-rating">
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
                        <PhoneIcon className="sp-icon" />
                      </span>
                      ({restaurant.phoneNumber.slice(0, 3)}) -{" "}
                      {restaurant.phoneNumber.slice(3, 6)} -{" "}
                      {restaurant.phoneNumber.slice(6, 10)}
                    </div>
                  ) : (
                    <div className="phone-num-notavailable">
                      <span className="sp-icon-container">
                        <PhoneIcon className="sp-icon" />
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
                        <LaunchIcon className="sp-icon" />
                      </span>
                      <span className="rest-url">{restaurant.webUrl}</span>
                    </a>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LaunchIcon className="sp-icon" />
                      </span>
                      NO Restaurant Link
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.wifi ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <WifiIcon className="sp-icon" />
                      </span>
                      Free Wi-Fi
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <WifiOffIcon className="sp-icon" />
                      </span>
                      NO Wi-Fi
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.healthScore ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <HealthAndSafetyIcon className="sp-icon" />
                      </span>
                      Health Score:{" "}
                      <span className="sp-rest-health-score">
                        {restaurant.healthScore}
                      </span>
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <HealthAndSafetyIcon className="sp-icon" />
                      </span>
                      NO Health Scores
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.delivery ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LocalShippingIcon className="sp-icon" />
                      </span>
                      Offers Delivery
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <LocalShippingIcon className="sp-icon" />
                      </span>
                      Doesn't Offer Delivery
                    </div>
                  )}

                  <div className="sp-line-divider"></div>

                  {restaurant.takeOut ? (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <TakeoutDiningIcon className="sp-icon" />
                      </span>
                      Offers Takeout
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <TakeoutDiningIcon className="sp-icon" />
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
                        <EditCalendarIcon className="sp-icon" />
                      </span>
                      Takes Reservations
                    </div>
                  ) : (
                    <div className="sp-rest-info-box">
                      <span className="sp-icon-container">
                        <EditCalendarIcon className="sp-icon" />
                      </span>
                      Does Not take reservations
                    </div>
                  )}
                </div>
              </div>

              <div className="sp-rest-reviews-container">123 reviews</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RestaurantShowPage;
