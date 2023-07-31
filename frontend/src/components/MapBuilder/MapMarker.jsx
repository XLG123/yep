import React from "react";
import "./MapMarker.css";

const MapMarker = ({text, tooltip}) => {
  return (
  <div className="circle">
    <span className="circleText" title={tooltip}>
      {text}
    </span>
    {console.log("I'm rendering")}
  </div>
  )
}

export default MapMarker;