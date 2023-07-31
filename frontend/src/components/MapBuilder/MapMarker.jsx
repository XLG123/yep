import React from "react";
import "./MapMarker.css";

const MapMarker = ({text, tooltip}) => {
  return (
  <div className="circle">
    <span className="circleText" title={tooltip}>
      {text}
    </span>
  </div>
  )
}

export default MapMarker;