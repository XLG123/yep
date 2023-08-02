import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./MapBuilder.css";
import { useNavigate } from "react-router-dom";

const MapBuilder = ({restaurants}) => {

  const navigate = useNavigate();

  const handleClick = (restaurant) => {
    navigate(`/restaurants/${restaurant.id}`);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, [])

  // Inherit size from parent container
  const containerStyle = {
    width: 'inherit',
    height: 'inherit'
  }

  // Using App Academy's location as the center of the map
  const center = {
    lat: 40.7361339,
    lng: -73.9937922,
  }

  return isLoaded ? (
    <div style={{ height: 'inherit', width: '30vw' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        
        {restaurants ? restaurants.map(restaurant => 
          <Marker key={restaurant.id}
            position={{lat: restaurant.latitude, lng: restaurant.longitude}} label={{text: restaurant.name, fontSize: '0.5vw'}}
            animation={window.google.maps.Animation.DROP}
            onClick={() => handleClick(restaurant)}
            />) : <></> 
        }

      </GoogleMap>
    </div>
  ) : <></>
}

export default MapBuilder;